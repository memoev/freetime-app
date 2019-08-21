

$('#submit').click(function(){
    // when clicked, input values get pushed to firebase
})

let urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("event")) {
    //this block only runs if the user is on a page that contains an event query string
	roomHash = urlParams.get("event");


} else {
    const eventRedirect = async ({name,email,title,week} = {}) => {
        let urlHash = await createEvent(name,email,title,week)
        window.location.replace(window.location.href + "?event=" + urlHash);
    }

    // example event call: eventRedirect({name: "Cody",email: "test@tester.com",title: "Big Party", week: "8/18/2019"})
}

