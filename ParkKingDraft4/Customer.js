var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;


//*******************************************************Only used in Index.js***********************************************
exports.getID = function(user) {
  var userID;
  if(user[5] == "Student"){
    userID = user[6];
  }else if(user[5] == "Professor"){
    userID = user[7];
  }else{
    userID = user[8];
  }
  return userID;
}

//*******************************************************Customer's Getter***********************************************
exports.getPassword = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Password FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getEmail = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Email FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getFirstname = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT FirstName FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getLastname = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT LastName FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getCustomerType = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT customerType FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getStudentID = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT StudentID FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getProfessorID = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT ProfessorID FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getNationalID = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT NationalID FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getCustomerPicture = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT CustomerPicture FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getCancel = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Cancel FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getReservable = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Reservable FROM dbo.Customer WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue[0]);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
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
