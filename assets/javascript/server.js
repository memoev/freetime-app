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
const createEvent = async (name, email, title, week) => {
	return new Promise(async resolve => {
		let doc = await plansRef.doc("idGenNumber").get();
		let id = doc.data().num;
		let hashids = new Hashids("event salt", 8);
		urlHash = hashids.encode(id);
		await plansRef.doc().set({
			organizer: { name: name, email: email },
			week: week,
			title: title,
			urlHash: urlHash,
			numRecipients: 0
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
const storeResponse = ({ serverRoomID, name, response = [] } = {}) => {
	return new Promise(async resolve => {
		await plansRef
			.doc(serverRoomID)
			.collection("responses")
			.doc(name)
			.set({ response: response });
		resolve("Response recorded!");
	});
};

const getEventID = async urlHash => {
	return new Promise(async resolve => {
		let snapshot = await plansRef.where("urlHash", "==", urlHash).get();
		snapshot.forEach(doc => {
			serverEventID = doc.id;
		});
		resolve(serverEventID);
	});
};

const popularTime = async () => {
	//pulled from stack overflow
	/* var store = ["1", "2", "2", "3", "4"];
	var frequency = {}; // array of frequency.
	var max = 0; // holds the max frequency.
	var result; // holds the max frequency element.
	for (var v in store) {
	  frequency[store[v]] = (frequency[store[v]] || 0) + 1; // increment frequency.
	  if (frequency[store[v]] > max) {
		// is this frequency > max so far ?
		max = frequency[store[v]]; // update max.
		result = store[v]; // update result.
	  }
	} */
  }