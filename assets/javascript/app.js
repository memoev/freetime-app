

$('#submit').click(function(){
    // when clicked, input values get pushed to firebase
})

let urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("event")) {
    //this block only runs if the user is on a page that contains an event query string
	roomHash = urlParams.get("event");


} else {
    createEvent("tester","test","test","test").then((urlHash) => {
        window.location.replace(window.location.href + "?event=" + urlHash);
});
}

