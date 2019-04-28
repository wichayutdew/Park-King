// alert('sdfdsfdsf');

$('form').submit(function(event){

  var plateNumber = $('#plateNumber').val();

  // var plateNum = plateNumber.replace( /^\D+/g, '');

  if(plateNumber.length > 7){
    alert('Plate number must has less than 7 characters with no space! (e.g. 2คค9876)');
    return false;
  } else if (plateNumber.length < 3){
    alert('Plate number must has more than 2 characters with no space! (e.g. 2กก1234)');
    return false;
  }

  // console.log(plateNum);

  return;
});
