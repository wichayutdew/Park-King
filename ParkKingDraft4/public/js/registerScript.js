


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

  if(username.length < 8 || username.length > 20){
    alert('Username must be between 8 to 20 characters');
    return false;
  }

  if(password.length < 8){
    alert('Password must has more than 8 characters.');
    return false;
  }

  if(studentID.length != 10 && occupation == 'Student'){
    alert('Student ID must has 10 digits');
    return false;
  }

  else if(professorID.length != 8 && occupation == 'Professor' ){
    alert('Professor ID must has 8 digits');
    return false;
  }

  else if(nationalID.length != 13 && occupation == 'Guest'){
    alert('National ID must has 13 digits');
    return false;
  }

  if(password !== passwordConfirmation){
    alert('Your passwords are not match.');
    return false;
  }





  return;
});
