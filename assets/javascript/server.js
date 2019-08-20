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
    name (string)
    email (string)
    title (string)
*/
const createEvent = (name,email,title, week) => {
    let id = 0;
    let urlHash = "";
    plansRef.doc('idGenNumber').get().then(doc => {
        id = doc.data().num;
    }).then( () => {
        let hashids = new Hashids("event salt", 8);
        urlHash = hashids.encode(id);
        plansRef.doc().set({
            "organizer" : {"name" : name, "email": email},
            "week" : week,
            "title" : title,
            "urlHash": urlHash,
            "numRecipients": 0,
            "responses" : {}
        })  
        
        plansRef.doc('idGenNumber').update({
            num: firebase.firestore.FieldValue.increment(1)
        })

        setTimeout(() => {
            window.location.replace(window.location.href + "?event=" + urlHash);
        }, 200);
    })
};
