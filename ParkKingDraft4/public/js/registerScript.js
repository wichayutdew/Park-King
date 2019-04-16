


$('form').submit(function(event){
  var username = $('#username').val();
  var password = $('#password').val();
  var passwordConfirmation = $('#passwordConfirmation').val();
  var email = $('#email').val();
  var firstname = $('#firstname').val();
  var lastname = $('#lastname').val();
  var occupation = $('#occupation').val();
  var studentID = $('#studentID').val();
  var professorID = $('#professorID').val();
  var nationalID = $('#nationalID').val();



  console.log(username);
  console.log(password);
  console.log(passwordConfirmation);
  console.log(email);
  console.log(firstname);
  console.log(lastname);
  console.log(occupation);
  console.log(studentID);
  console.log(professorID);
  console.log(nationalID);

  if(password !== passwordConfirmation){
    alert('Your passwords are not match.');
    return false;
  }





  return;
});
