
// alert('This is a reserve page.');

$('form.reserveForm').submit(function(event){


  var plateNumber = $("input[name=plateNumber]:checked").val();
  var buildingName = $("input[name=buildingName]:checked").val();

  console.log(plateNumber);
  console.log(buildingName);

  alert('Reservation in progress');

  return;
});
