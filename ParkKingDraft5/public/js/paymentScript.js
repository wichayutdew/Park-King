
// alert('This is a payment page.');

$('form.paymentAction').submit(function(event){

  // var paymentChoice = $('#paymentChoice').val();
  var paymentChoice = $("input[name=paymentChoice]:checked").val();


  console.log(paymentChoice);

  alert('Payment process might takes some time!!!');

  return;
});
