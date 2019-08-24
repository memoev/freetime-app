// Google calendar credentials
// Client ID
// 838362569768-7a7ht805jfah89m891426kdhu9r4fufu.apps.googleusercontent.com
// Client Secret
// YAXoXdXkLgeDGDkfcNsVG5UF
// API Key
// AIzaSyCcauF0Bw_PxIWoHyXfWVntgcnIu0Bx3Vc

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
