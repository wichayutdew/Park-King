alert('sdfdsfdsf');

$('form').submit(function(event){

  var plateNumber = $('#plateNumber').val();

  var plateNum = plateNumber.replace( /^\D+/g, ''); // replace all leading non-digits with nothing

  if(plateNum.length > 4){
    alert('Plate number must has less than 4 digits.');
    return false;
  }
  // console.log(plateNum);

  return;
});
