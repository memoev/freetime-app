// Google calendar credentials
// Client ID
// 838362569768-7a7ht805jfah89m891426kdhu9r4fufu.apps.googleusercontent.com
// Client Secret
// YAXoXdXkLgeDGDkfcNsVG5UF
// API Key
// AIzaSyCcauF0Bw_PxIWoHyXfWVntgcnIu0Bx3Vc

const eventRedirect = async (name, email, title, week) => {
  let urlHash = await createEvent(name, email, title, week);
  window.location.replace(window.location.href + "?event=" + urlHash);
};

$("#submit").click(function() {
  eventRedirect("Gerritt", "test@tester.com", "Big Party", "8/18/2019");
  // when clicked, input values get pushed to firebase

const eventRedirect = async (name, email, title, week) => {
	let urlHash = await createEvent(name, email, title, week);
	window.location.replace(window.location.href + "?event=" + urlHash);
};

$("#submit").click(function() {
	eventRedirect("Gerritt", "test@tester.com", "Big Party", "8/18/2019");
	// when clicked, input values get pushed to firebase

});

let urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("event")) {

  //this block only runs if the user is on a page that contains an event query string
  roomHash = urlParams.get("event");
} else {
  const eventRedirect = async ({ name, email, title, week } = {}) => {
    let urlHash = await createEvent(name, email, title, week);
    window.location.replace(window.location.href + "?event=" + urlHash);
  };

  // example event call: eventRedirect({name: "Cody",email: "test@tester.com",title: "Big Party", week: "8/18/2019"})

	//this block only runs if the user is on a page that contains an event query string
	roomHash = urlParams.get("event");
} else {
	const eventRedirect = async ({ name, email, title, week } = {}) => {
		let urlHash = await createEvent(name, email, title, week);
		window.location.replace(window.location.href + "?event=" + urlHash);
	};

	// example event call: eventRedirect({name: "Cody",email: "test@tester.com",title: "Big Party", week: "8/18/2019"})

}

$("document").ready(function() {
  $(".participant").hide();
  $(".date-selection").hide();
});

$("#home").click(() => {
  location.reload();
});

$("#get-started").click(function() {
  $(".landing-page").hide();
  $(".participant").show();
});

$("#finish").click(e => {
  e.preventDefault();
  $(".participant").hide();
  $(".date-selection").show();
});

$("#submit").click(function(e) {
  // when clicked, input values get pushed to firebase
  e.preventDefault();


$("#time-submit").click(e => {
  e.preventDefault();
  let userChecks = [];
  for (let i = 0; i < 42; i++) {
    let check = $("#input-" + i);
    if (check.is(":checked")) {
      userChecks.push(check.attr("data-time"));
      console.log(userChecks);
    }
  }
});

function popularTime() {
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

