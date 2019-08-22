

$('#submit').click(function(){
    // when clicked, input values get pushed to firebase

})

$('#').click(function(){
    showLink();
});

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

    document.execCommand("copy");
}