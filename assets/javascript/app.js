// Google calendar credentials
// Client ID
// 838362569768-7a7ht805jfah89m891426kdhu9r4fufu.apps.googleusercontent.com
// Client Secret
// YAXoXdXkLgeDGDkfcNsVG5UF
// API Key
// AIzaSyCcauF0Bw_PxIWoHyXfWVntgcnIu0Bx3Vc

// Calendar Script

// Client ID and API key from the Developer Console
var CLIENT_ID = '838362569768-7a7ht805jfah89m891426kdhu9r4fufu.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCcauF0Bw_PxIWoHyXfWVntgcnIu0Bx3Vc';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        appendPre(event.summary + ' (' + when + ')')
      }
    } else {
      appendPre('No upcoming events found.');
    }
  });
}


const eventRedirect = async ({ name, email, title, week } = {}) => {
	let urlHash = await createEvent(name, email, title, week);
	window.location.replace(window.location.href + "?event=" + urlHash);
};

//pulls URL from browser
let urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("event")) { //checks if it has an event tag
	//this block only runs if the user is on a page that contains an event query string
	urlHash = urlParams.get("event");
	let serverEventID = getEventID(urlHash).then(() => {
    $("#response.container").fadeIn();
    if (windows.location.href.includes("&organizer=true")) {
      // Runs getStatus and bestTime functions
    } else {
      //TODO: Display response screen first then listener for
      $("#time-submit").click(e => {
        e.preventDefault();
        let userChecks = [];
        for (let i = 0; i < 42; i++) {
          let check = $("#input-" + i);
          if (check.is(":checked")) {
            userChecks.push(check.attr("data-time"));
          }
        }
        // storeResponse({serverEventID, name, userChecks});
      });
    }
	});
  } else {
	$("#landing-page").fadeIn();
	//TODO: take inputs to pass into eventRedirect

	$("#get-started").click(function() {
		eventRedirect("Gerritt", "test@tester.com", "Big Party", "8/18/2019");
		// when clicked, input values get pushed to firebase
	});
  } 

// example event call: eventRedirect({name: "Cody",email: "test@tester.com",title: "Big Party", week: "8/18/2019"})

$("#take-it-home").click(function() {
	// element id must go in this line
	showLink();
});

// function to render textarea with the page url and copies it clipboard
var showLink = () => {
	let body = $(document.body);
	let url = window.location.href;

  // create html elements dynamically
	body.empty();
  newDiv = $("<div>");
	newDiv2 = $("<div>");  
  newTextArea = $("<textarea>");
	newTextArea2 = $("<textarea>");  
	newTextArea.text(url);
  newTextArea2.text(url + "&organizer=true");
	newTextArea.select();
  newLegend = $("<h1>");
	newLegend2 = $("<h1>");  
	newLegend.text("Share this link with the people you want to invite");
	newLegend2.text("Organizer Link!");
	newSubLegend = $("<h3>");
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
