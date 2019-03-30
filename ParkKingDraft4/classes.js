require('getterSetter')
export function Customer(username) {
  var username = username;
  var password = getUserPassword(username);
  var email = getUserEmail(username);
  var firstname = getUserFirstName(username);
  var lastname = getUserLastName(username);
  var type = getUserCustomerType(username);
  var studentID = getUserStudentID(username);
  var professorID = getUserProfessorID(username);
  var nationalID = getUserNationalID(username);
  var cancel = getUserCancel(username);
  var customerpicture = getUserCustomerPicture(username);
  var reservable = getUserReservable(username);
}
