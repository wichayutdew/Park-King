function getUserFirstName(Username){
  var returnedValue = {};
  var request = new request("SELECT c.FirstName FROM dbo.Customer c WHERE Username = c.Username",
  function (err, rowCount, rows){
      if(err){
          done(err);
      }else{

      }
  });
  request.on('row', function (column)){
    columns.forEach(function (column)){
      returnedValue.push(column.value);
    }
  }
  request.on('requestCompleted', function (){
  //connection.close();
  })
  connection.execSql(request);
  return returnedValue;
}

function setUserFirstName(Username,FirstName){
  var request = new request ("UPDATE dbo.Customer c SET c.FirstName = 'FirstName' WHERE Username = c.Username")
}

getUserLastName(Username)
SELECT c.LastName
FROM Customer c
WHERE Username = c.Username

getUserCustomerType(Username)
SELECT c.CustomerType
FROM Customer c
WHERE Username = c.Username

getUserCustomerPicture(Username)
SELECT c.CustomerPicture
FROM Customer c
WHERE Username = c.Username

getUserStudentID(Username)
SELECT c.StudentID
FROM Customer c
WHERE Username = c.Username

getUserProfessorID(Username)
SELECT c.ProfessorID
FROM Customer c
WHERE Username = c.Username

getUserNationalID(Username)
SELECT c.NationalID
FROM Customer c
WHERE Username = c.Username

getUserReservable(Username)
SELECT c.Reservable
FROM Customer c
WHERE Username = c.Username

setUserCancel(Username,Cancel)

setUserUsername(Username)
setUserPassword(Username,Password)
setUserEmail(Username,Email)

setUserLastName(Username,LastName)
setUserCustomerType(Username,CustomerType)
setUserCustomerPicture(Username,CustomerPicture)
setUserStudentID(Username,StudentID)
setUserProfessorID(Username,ProfessorID)
setUserNationalID(Username,NationalID)
setUserReservable(Username,Reservable)

removeUser(Username)
DELETE FROM Customer c
WHERE Username = c.Username
