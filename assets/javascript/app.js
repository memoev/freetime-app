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
