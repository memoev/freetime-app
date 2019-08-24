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
});

$('#take-it-home').click(function(){ // element id must go in this line
    showLink();
});

// function to render textarea with the page url and copies it clipboard
var showLink = () => {
    let body = $(document.body)
    let url = window.location.href;
    
    body.empty();
    newDiv = $('<div>');
    newTextArea = $('<textarea>');
    newTextArea.text(url);
    newTextArea.select();
    newLegend = $('<h1>');
    newLegend.text('Share this link with the people you want to invite');
    newSubLegend = $('<h3>')
    newSubLegend.text('Link has been copied to clipboard');
    
    newDiv.append(newTextArea);
    newDiv.append(newLegend);
    newDiv.append(newSubLegend);
    body.append(newDiv);

	// copy to clipboard happends here!
    document.execCommand("copy");
}