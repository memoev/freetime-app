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

let urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("event")) {
  //this block only runs if the user is on a page that contains an event query string
  roomHash = urlParams.get("event");
} else {
  const eventRedirect = async (name, email, title, week) => {
    let urlHash = await createEvent(name, email, title, week);
    window.location.replace(window.location.href + "?event=" + urlHash);
  };

  // example event call: eventRedirect("Cody","test@tester.com","Big Party", "8/18/2019")
}

// function createDataTable() {
//   const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
//   days.forEach((item, index) => {
//     const dayDiv = $("<div>").addClass("uk-width-auto@m");
//     const dayDisplay = $("<div>").addClass(
//       "uk-card uk-card-default uk-card-body"
//     );
//     const timeContainer = $("<div>").addClass("uk-width-auto@m");
//     const timeDiv = $("<div>").addClass("uk-card uk-card-default uk-card-body");
//     const timeCheckBox = $('<input type="checkbox">').addClass("uk-checkbox");
//     dayDiv.append(dayDisplay).text(item);
//     timeContainer.append(timeDiv).text(index);
//     timeContainer.append(timeCheckBox);
//     $(".date-selection").append(dayDiv);
//     $(".date-selection").append(timeContainer);
//   });
// }
