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
        week (string)
        title (string)
        urlHash (string)
        numRecipients (int)
        responses (collection)
            responseN (NAME - document)
                response : {["times"]}
*/

/*
function expects:
    object = { name, email, title, week}

    returns promise and resolves with unique URL Hash
*/
const createEvent = async (title, week, numRecipients) => {
	return new Promise(async resolve => {
		let doc = await plansRef.doc("idGenNumber").get();
		let id = doc.data().num;
		let hashids = new Hashids("event salt", 8);
		urlHash = hashids.encode(id);
		await plansRef.doc().set({
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
promise and resolves with status as object {numResponded: (int), done: (boolean)}
*/
const getStatus = async serverEventID => {
	return new Promise(async resolve => {
		let snapshot = await plansRef
			.doc(serverEventID)
			.collection("responses")
			.get();
		let numResponded = 0;
		snapshot.forEach(doc => {
			numResponded++;
		});
		let doc = await plansRef.doc(serverEventID).get();
		let numRecipients = parseInt(doc.data().numRecipients);
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
calendarFormatStart: (string as YYYY-MM-DDTHH:mm:ss-6:00),
calendarFormatEnd: (string as YYYY-MM-DDTHH:mm:ss-6:00),
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
		result.bestTime = result.bestTime[0];
		result.calendarFormatStart = moment(result.bestTime, "dddd h a").format("YYYY-MM-DDTHH:mm:ss-6:00");
		result.calendarFormatEnd = moment(result.bestTime, "dddd h a").add(2, 'h').format("YYYY-MM-DDTHH:mm:ss-6:00");
		snapshot = await plansRef
			.doc(serverEventID)
			.collection("responses")
			.get();
		let conflicts = [];
		snapshot.forEach(doc => {
			if (!doc.data().response.includes(result.bestTime)) {
				conflicts.push(doc.id);
			}
		});
		result.conflicts = conflicts;

		resolve(result);
	});
};

/*
function expects:
serverEventID (string)

returns:
{title: (string),
week: (string as YYYY-MM-DDTHH:mm:ss-6:00)}
*/
const getDetails = async serverEventID => {
	return new Promise(async resolve => {
		let doc = await plansRef
			.doc(serverEventID)
			.get();
		let title = doc.data().title;
		let week
	})
}
