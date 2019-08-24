var firebaseConfig = {
	apiKey: "AIzaSyCmpucAhOQ8Q5RSA44F6MotgDXlSRepgYY",
	authDomain: "freetime-13631.firebaseapp.com",
	databaseURL: "https://freetime-13631.firebaseio.com",
	projectId: "freetime-13631",
	storageBucket: "",
	messagingSenderId: "731645477307",
	appId: "1:731645477307:web:7f20c7956bdc8725"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

let plansRef = db.collection("plans");
/*
DATA STRUCTURE

plans (collection)
    auto-ID (document)
        organizer {name: (string), email: (string)}
        week (string)
        title (string)
        urlHash (string)
        numRecipients (int)
        responses (collection)
            responseN (document)
                name (string)
                availableTimes : {Sun : [8-10, 2-3], Sat: ...}
*/

/*
function expects:
    object = { name, email, title, week}

    returns promise and resolves with unique URL Hash
*/
const createEvent = async (name, title, week, numRecipients) => {
	return new Promise(async resolve => {
		let doc = await plansRef.doc("idGenNumber").get();
		let id = doc.data().num;
		let hashids = new Hashids("event salt", 8);
		urlHash = hashids.encode(id);
		await plansRef.doc().set({
			organizer: name,
			week: week,
			title: title,
			urlHash: urlHash,
			numRecipients: numRecipients
		});

		await plansRef.doc("idGenNumber").update({
			num: firebase.firestore.FieldValue.increment(1)
		});

		resolve(urlHash);
	});
};

/*
function expects:
object {
	serverRoomID
	name
	array of times
}
	returns promise and resolves with success message
*/
const storeResponse = ({ serverEventID, name, response = [] } = {}) => {
	return new Promise(async resolve => {
		await plansRef
			.doc(serverEventID)
			.collection("responses")
			.doc(name)
			.set({ response: response });
		resolve("Response recorded!");
	});
};

/*
function expects:
urlHash (string)

returns promise and resolves with serverEventID*/
const getEventID = async urlHash => {
	return new Promise(async resolve => {
		let snapshot = await plansRef.where("urlHash", "==", urlHash).get();
		snapshot.forEach(doc => {
			serverEventID = doc.id;
		});
		resolve(serverEventID);
	});
};

/*
function expects :
serverEventID (string)
returns:
promise and resolves withstatus as object {numResponded: (int), done: (boolean)}
*/
const getStatus = async serverEventID => {
	return new Promise(async resolve => {
		let snapshot = await plansRef
			.doc(serverEventID)
			.collection("responses")
			.get();
		let numResponded = 0;
		snapshot.forEach(() => {
			numResponded++;
		});
		let doc = await plansRef.doc(serverEventID).get();
		let numRecipients = doc.data().numRecipients;
		resolve({
			numResponded: numResponded,
			done: numRecipients === numResponded
		});
	});
};

/*
function expects:
serverEventID (string)

returns:
{bestTime: (string),
conflicts: ["names"]
}
*/
const bestTime = async serverEventID => {
	return new Promise(async resolve => {
		let snapshot = await plansRef
			.doc(serverEventID)
			.collection("responses")
			.get();
		let allResponses = [];
		snapshot.forEach(doc => {
			allResponses.push(doc.data().response);
		});

		let frequency = {};
		let max = 0;
		let result = {};

		for (let v in allResponses) {
			frequency[allResponses[v]] = (frequency[allResponses[v]] || 0) + 1; // increment frequency.
			if (frequency[allResponses[v]] > max) {
				max = frequency[allResponses[v]]; // update max.
				result.bestTime = allResponses[v]; // update result.
			}
		}
		let snapshot = await plansRef
			.doc(serverEventID)
			.collection("responses")
			.get();
		let conflicts = [];
		snapshot.forEach(doc => {
			if (doc.data().response.includes(result)) {
				conflicts.push(doc.id);
			}
		});
		result.conflicts = conflicts;

		resolve(result);
	});
};
