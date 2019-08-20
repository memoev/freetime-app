var recipients = []

$('#input-recepient').click(function(){

    event.preventDefault();
    $("tbody").empty();
    
    recipientHolder = $("#recipient-holder").val();
    // console.log(recipientHolder);
    
    recipients.push(recipientHolder);
    // console.log(recipients);

    $("#recipient-holder").val("")

    for (var i = 0; i < recipients.length; i++) {
        newRow = $("<td>")
        newRow.text(recipients[i]);
        
        newEntry = $("<tr>");
        newEntry.append(newRow);

        $("tbody").append(newEntry);
    }

})
