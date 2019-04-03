var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;

module.exports = function(connection,username){
  getFirstname(connection,username,function(data){
    this.firstname = data;
  });
}

var returnedValue  = [];
function getFirstname(connection,username,Callback) {
    var request = new Request(
      'SELECT FirstName FROM dbo.Customer WHERE Username = @username',
      function(err, rowCount, rows) {
        if (err) {
          console.log(err);
          connection.release();
          returnedValue = null;
        } else {
          return Callback(returnedValue[0]);
          connection.release();
          //console.log(returnedValue[0]);
        }
      });
    request.addParameter('username',TYPES.VarChar,username);

    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
        //console.log(login_request + 'info');
    });
    connection.execSql(request);
    //return returnedValue[0];
  // this.password = getUserPassword(connection,username);
  // this.email = getUserEmail(username);
  // this.firstname = getUserFirstName(username);
  // this.lastname = getUserLastName(username);
  // this.customerType = getUserCustomerType(username);
  // if(customerType = 'STUDENT'){
  //   this.ID = getUserStudentID(username);
  // }else if(customerType = 'PROFESSOR'){
  //   this.ID = getUserProfessorID(username);
  // }else if(customerType = 'GUEST'){
  //   this.ID = getUserNationalID(username);
  // }
  // this.cancel = getUserCancel(username);
  // this.customerpicture = getUserCustomerPicture(username);
  // this.reservable = getUserReservable(username);
}

//*******************************************************Customer's Getter***********************************************
// function getUserUsername(username) {
//   var request = new request("SELECT C.Username FROM dbo.Customer C WHERE C.Username = @username",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.addParameter('username',TYPES.VarChar,username);
//   var returnedValue = {};
//   request.on('row', function(columns) {
//     columns.forEach(function(column) {
//       returnedValue.push(column.value);
//     });
//     //console.log(returnedValue);
//   });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
//   return returnedValue;
// }
function getUserUsername(connection,username){
  var returnedValue;
  var request = new Request(
    'SELECT Username FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        //console.log(returnedValue[0]);
        return returnedValue[0];
      }

    });
  request.addParameter('username',TYPES.VarChar,username);
  request.on('row', function (columns) {
      columns.forEach(function(column) {
          returnedValue.push(column.value);
      });
      //console.log(login_request + 'info');
  });
  connection.execSql(request);
  //return returnedValue[0];
}

function getUserPassword(username) {
  var request = new request("SELECT C.Password FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserEmail(username) {
  var request = new request("SELECT C.Email FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
    request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserFirstName(username) {
  var request = new request("SELECT C.FirstName FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserLastName(username) {
  var request = new request("SELECT C.LastName FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserCustomerType(username) {
  var request = new request("SELECT C.customerType FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserStudentID(username) {
  var request = new request("SELECT C.StudentID FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserProfessorID(username) {
  var request = new request("SELECT C.ProfessorID FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserNationalID(username) {
  var request = new request("SELECT C.NationalID FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserCustomerPicture(username) {
  var request = new request("SELECT C.CustomerPicture FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserCancel(username) {
  var request = new request("SELECT C.Cancel FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

function getUserReservable(username) {
  var request = new request("SELECT C.Reservable FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('username',TYPES.VarChar,username);
  var returnedValue = {};
  request.on('row', function(columns) {
    columns.forEach(function(column) {
      returnedValue.push(column.value);
    });
    //console.log(returnedValue);
  });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
  return returnedValue;
}

//*******************************************************Customer's Setter***********************************************
function setUserUsername(username, newUsername) {
  var request = new request("UPDATE dbo.Customer C SET C.Username = @newUsername WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('newUsername',TYPES.VarChar,newUsername);
  request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserPassword(username, password) {
  var request = new request("UPDATE dbo.Customer C SET C.Password =  @password WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('password',TYPES.VarChar,password);
  request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserEmail(username, email) {
  var request = new request("UPDATE dbo.Customer C SET C.Email = @email WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('email',TYPES.VarChar,email);
  request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserFirstName(username, firstname) {
  var request = new request("UPDATE dbo.Customer C SET C.FirstName =  @firstname WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('firstname',TYPES.VarChar,firstname);
  request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserLastName(username, lastname) {
  var request = new request("UPDATE dbo.Customer C SET C.LastName = @lastname WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('lastname',TYPES.VarChar,lastname);
  request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserCustomerType(username, customertype) {
  var request = new request("UPDATE dbo.Customer C SET C.customerType = @customertype WHERE C.Username =  @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
    request.addParameter('customertype',TYPES.VarChar,customertype);
    request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserStudentID(username, studentid) {
  var request = new request("UPDATE dbo.Customer C SET C.StudentID =  @studentid WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('studentid',TYPES.VarChar,studentid);
  request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserProfessorID(username, professorid) {
  var request = new request("UPDATE dbo.Customer C SET C.ProfessorID =  @professorid WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('professorid',TYPES.VarChar,professorid);
  request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserNationalID(username, nationalid) {
  var request = new request("UPDATE dbo.Customer C SET C.NationalID = @nationalid WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('nationalid',TYPES.VarChar,nationalid);
  request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserCustomerPicture(username, customerpicture) {
  var request = new request("UPDATE dbo.Customer C SET C.CustomerPicture =  @customerpicture WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.addParameter('customerpicture',TYPES.VarChar,customerpicture);
  request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserCancel(username, cancel) {
  var request = new request("UPDATE dbo.Customer C SET C.Cancel =  @cancel WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
    request.addParameter('cancel',TYPES.VarChar,cancel);
    request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserReservable(username, reservable) {
  var request = new request("UPDATE dbo.Customer C SET C.Reservable =  @reservable WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
    request.addParameter('reservable',TYPES.Bit,reservable);
    request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Customer's Remover***********************************************
function removeUser(username) {
  var request = new request("DELETE FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
    request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}
