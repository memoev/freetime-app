// Calendar Script

// Client ID and API key from the Developer Console
var CLIENT_ID =
	"731645477307-rksdri7c881nlmgfgvqqlflrkmcfrmhh.apps.googleusercontent.com";
var API_KEY = "AIzaSyBIu1XiwACH52_xrlgIbgKPo-sdLXI9Xso";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
	"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events";

var authorizeButton = document.getElementById("authorize_button");
var signoutButton = document.getElementById("signout_button");
var addCalendarButton = document.getElementById("add_calendar_button");

let event = {};

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
	gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
	gapi.client
		.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES
		})
		.then(
			function() {
				// Listen for sign-in state changes.
				gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

				// Handle the initial sign-in state.
				updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
				authorizeButton.onclick = handleAuthClick;
				signoutButton.onclick = handleSignoutClick;
				addCalendarButton = handleAddClick(event);
			},
			function(error) {
				console.log(JSON.stringify(error, null, 2));
			}
		);
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		authorizeButton.style.display = "none";
		signoutButton.style.display = "block";
		addCalendarButton.style.display = "block";
	} else {
		authorizeButton.style.display = "block";
		signoutButton.style.display = "none";
	}
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
	console.log(event);
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
	console.log(event);
}

function handleAddClick(event){
	  
	  return gapi.client.calendar.events.insert({
		'calendarId': 'primary',
		'resource': event
	  }).then(function(response) {
		// Handle the results here (response.result has the parsed body).
		console.log("Response", response);
	  },
	  function(err) { console.error("Execute error", err); });;
	  
	  
}

const eventRedirect = async ({ numRecipients, title, week } = {}) => {
	let urlHash = await createEvent(title, week, numRecipients);
	window.location.replace(window.location.href + "?event=" + urlHash);
};

// function to render textarea with the page url and copies it clipboard
const showLink = () => {
	let body = $(document.body);
	let url = window.location.href;

	// create html elements dynamically
	body.empty();

	let newDiv = $("<div>");
	let newDiv2 = $("<div>");
	let newTextArea = $("<textarea>");
	let newTextArea2 = $("<textarea>");
	newTextArea.text(url);
	newTextArea2.text(url + "&organizer=true");
	newTextArea.select();

	let newLegend = $("<h1>");
	let newLegend2 = $("<h1>");
	newLegend.text("Share this link with the people you want to invite");
	newLegend2.text("Organizer Link!");

	let newSubLegend = $("<h3>");
	newSubLegend.text("Link has been copied to clipboard");

	// append elements with share link url
	newDiv.append(newTextArea);
	newDiv.append(newLegend);
	newDiv.append(newSubLegend);

	// append elements with organizer url
	newDiv2.append(newTextArea2);
	newDiv2.append(newLegend2);

	body.append(newDiv);
	body.append(newDiv2);

	// copy to clipboard happends here!
	document.execCommand("copy");
};

const eventContext = async () => {
	urlHash = urlParams.get("event");
	let serverEventID = await getEventID(urlHash);

	return serverEventID;
};

//pulls URL from browser
let urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("event")) {
	//checks if it has an event tag
	//this block only runs if the user is on a page that contains an event query string
	//IIFE for async functionality
	(async () => {
		//contextualize with private server ID
		let serverEventID = await eventContext();
		let status = await getStatus(serverEventID);
		//first check if the user is visiting the organizer link
		if (urlParams.get("organizer")) {
			if (status.done) {
				let time = await bestTime(serverEventID);
				await $("#best-time").text(time.bestTime);
				await $("#conflicts").text(time.conflicts);
				let details = await getDetails(serverEventID);
				event = {
					'summary': details.title,
					'start': {
					  'dateTime': time.calendarFormatStart,
					  'timeZone': 'America/Denver'
					},
					'end': {
					  'dateTime': time.calendarFormatEnd,
					  'timeZone': 'America/Denver'
					},
					'reminders': {
					  'useDefault': true
				  }
				};

				$("#result-page").fadeIn();
			} else {
				$("#result-page").html(
					"<h1>Still waiting on some responses! Check back later!"
				);
				$("#result-page").fadeIn();
				
			}
		} else {
			//if not organizer URL, first check status
			if (status.done) {
				//if all people have responded
				$("#response-container").html(
					"<h1>All responses recorded! You'll be hearing from the organizer soon!</h1>"
				);
				$("#response-container").fadeIn();
			} else {
				//get URL hash
				let urlHash = urlParams.get("event");
				//check local storage for all events
				let localEvents = JSON.parse(localStorage.getItem("events")) || {};
				let thisEvent = localEvents[urlHash] || {};
				let answered;
				if (thisEvent !== undefined) {
					answered = thisEvent.answered;
				} else {
					answered = false;
				}
				//if they havent't answered for this event
				if (!answered) {
					//if not answered fade in page to record response
					$("#response-container").fadeIn();
					$("#time-submit").click(async e => {
						//when submit clicked, takes all responses into an array
						e.preventDefault();
						let userChecks = [];
						for (let i = 0; i < 42; i++) {
							let check = $("#input-" + i);
							if (check.is(":checked")) {
								userChecks.push(check.attr("data-time"));
							}
						}
						//send responses to DB
						let name = $("#response-name").val();
						let response = {
							serverEventID: serverEventID,
							name: name,
							response: userChecks
						};
						await storeResponse(response);
						await $("#response-container").fadeOut();
						$("#response-container").html(
							"<h2> Your response was recorded!</h2>"
						);
						if (status.numResponded === 0) {
							showLink();
						}
						$("#response-container").fadeIn();
						thisEvent.answered = true;
						localEvents[urlHash] = thisEvent;
						localStorage.setItem("events", JSON.stringify(localEvents));
					});
				} else {
					$("#response-container").html(
						"<h1>You have already answered for this event!"
					);
					$("#response-container").fadeIn();
				}
			}
		}
	})();
} else {
	$("#landing-page").fadeIn();

	$("#get-started").click(function() {
		let title = $("#event-name").val();
		let week = $("#event-week").val();
		let numRecipients = $("#event-participants").val();

		if (title === '' || week === '' || numRecipients === '') {
			$(".error-holder").empty();
			let newDiv = $("<div>");
			newDiv.text('Please input all fields');
			newDiv.addClass("error");
			$(".error-holder").append(newDiv);
		} else {
			eventRedirect({
				title: title,
				week: week,
				numRecipients: numRecipients
			});
		}

	});
}
