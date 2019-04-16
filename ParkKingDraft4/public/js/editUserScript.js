

$('form').submit(function(event){
  var r = confirm("Are you sure?");
  if (r == true) {
    return;
  } else {
    return false;
}
});
