function Customer(username) {
  this.username = username;
  this.password = getUserPassword(username);
  this.email = getUserEmail(username);
  this.firstname = getUserFirstName(username);
  this.lastname = getUserLastName(username);
  this.type = getUserCustomerType(username)
  if (this.type = student) {
    this.userID = getUserStudentID(username)
  } else if (this.type = professor) {
    this.userID = getUserProfessorID(username)
  } else {
    this.userID = getUserNationalID(username)
  }
  this.reservable = getUserReservable(username);
  this.cancel = getUserCancel(username);
}
