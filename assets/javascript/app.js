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


