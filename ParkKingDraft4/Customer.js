var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;

//*******************************************************Inserting new customer into database***********************************************
exports.insert_newCustomer = function(connection,car_info,done,newUserMysql){
  var request = new Request("INSERT INTO dbo.Customer (FirstName,LastName,Email,Username,Password,customerType,studentID,professorID,NationalID,CustomerPicture,Reserveable) values (@firstName,@lastName,@email,@username,@password,@occupation,@studentID,@professorID,@CitizenID,@profilePic,@reserveAble)",
  //CustomerPicture,profilePic
  function (err, rowCount, rows){
    if(err){
      connection.release();
      return done(err);
    }else{
      connection.release();
      return done(null, newUserMysql);
    }
  });
  request.addParameter('firstName',TYPES.VarChar,customer_info.fname);
  request.addParameter('lastName',TYPES.VarChar,customer_info.lname);
  request.addParameter('email',TYPES.VarChar,customer_info.email);
  request.addParameter('username',TYPES.VarChar,customer_info.username);
  request.addParameter('password',TYPES.VarChar,customer_info.password);
  request.addParameter('occupation',TYPES.VarChar,customer_info.occupation);
  request.addParameter('studentID',TYPES.VarChar,customer_info.studentID);
  request.addParameter('professorID',TYPES.VarChar,customer_info.professorID);
  request.addParameter('CitizenID',TYPES.VarChar,customer_info.guestID);
  request.addParameter('profilePic',TYPES.VarChar,customer_info.CustomerPicture);
  request.addParameter('reserveAble',TYPES.Bit,customer_info.Reserveable);
  request.on('requestCompleted', function (){
    //connection.close();
    //error here
  })
  connection.execSql(request);
}

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
exports.setUsername = function(connection, username, newUsername) {
  var request = new request("UPDATE dbo.Customer C SET C.Username = @newUsername WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setPassword = function(connection, username, password) {
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

exports.setEmail = function(connection, username, email) {
  var request = new request("UPDATE dbo.Customer C SET C.Email = @email WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setFirstname = function(connection, username, firstname) {
  var request = new request("UPDATE dbo.Customer C SET C.FirstName =  @firstname WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setLastname = function(connection, username, lastname) {
  var request = new request("UPDATE dbo.Customer C SET C.LastName = @lastname WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setCustomerType = function(connection, username, customertype) {
  var request = new request("UPDATE dbo.Customer C SET C.customerType = @customertype WHERE C.Username =  @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setStudentID = function(connection, username, studentid) {
  var request = new request("UPDATE dbo.Customer C SET C.StudentID =  @studentid WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setProfessorID = function(connection, username, professorid) {
  var request = new request("UPDATE dbo.Customer C SET C.ProfessorID =  @professorid WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setNationalID = function(connection, username, nationalid) {
  var request = new request("UPDATE dbo.Customer C SET C.NationalID = @nationalid WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setCustomerPicture = function(connection, username, customerpicture) {
  var request = new request("UPDATE dbo.Customer C SET C.CustomerPicture =  @customerpicture WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setCancel = function(connection, username, cancel) {
  var request = new request("UPDATE dbo.Customer C SET C.Cancel =  @cancel WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.setReservable = function(connection, username, reservable) {
  var request = new request("UPDATE dbo.Customer C SET C.Reservable =  @reservable WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
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

exports.editCustomer = function(connection,username,edited_info){
  var request = new request("UPDATE dbo.Customer SET Email = @email, FirstName = @firstname, LastName = @lastname, customerType = @customertype, StudentID = @studentid, ProfessorID = @professorid, NationalID = @nationalid, CustomerPicture = @customerpicture WHERE Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.addParameter('firstName',TYPES.VarChar,edited_info.firstname);
    request.addParameter('lastName',TYPES.VarChar,edited_info.lastname);
    request.addParameter('email',TYPES.VarChar,edited_info.email);
    request.addParameter('customertype',TYPES.VarChar,edited_info.customertype);
    request.addParameter('studentid',TYPES.VarChar,edited_info.studentID);
    request.addParameter('professorid',TYPES.VarChar,edited_info.professorID);
    request.addParameter('Citizenid',TYPES.VarChar,edited_info.nationalID);
    request.addParameter('customerpicture',TYPES.VarChar,edited_info.CustomerPicture);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Customer's Remover***********************************************
exports.removeUser = function(connection, username) {
  var request = new request("DELETE FROM dbo.Customer C WHERE C.Username = @username",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}
