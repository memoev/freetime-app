var recepients = []

$('#input-recepient').click(function(){
    event.preventDefault();

    recepients.push($("#recipient-holder").val());
    console.log(recepients);
    
})
