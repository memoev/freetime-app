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

const createEvent = id => {
	let hashids = new Hashids("event salt");
	let urlHash = hashids.encode(id);

	return urlHash;
};
