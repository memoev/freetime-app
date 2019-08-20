var recipients = []
// SendGrid API Key = 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

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
