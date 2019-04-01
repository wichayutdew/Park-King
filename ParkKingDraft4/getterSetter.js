var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;
//*******************************************************Customer's Getter***********************************************

  module.exports = function(connection,username) {
    this.connection = connection;
    this.username = username;

    this.getUserUsername = function(){
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
            return returnedValue[0]
          }

        });
      request.addParameter('username',TYPES.VarChar,username);

      var returnedValue  = [];
      request.on('row', function (columns) {
          columns.forEach(function(column) {
              returnedValue.push(column.value);
          });
          //console.log(login_request + 'info');
      });
      connection.execSql(request);
      //return returnedValue[0];
    }

  }
//   function getUserPassword(username) {
//   var request = new request("SELECT C.Password FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserEmail(username) {
//   var request = new request("SELECT C.Email FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserFirstName(username) {
//   var request = new request("SELECT C.FirstName FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserLastName(username) {
//   var request = new request("SELECT C.LastName FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserCustomerType(username) {
//   var request = new request("SELECT C.customerType FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserStudentID(username) {
//   var request = new request("SELECT C.StudentID FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserProfessorID(username) {
//   var request = new request("SELECT C.ProfessorID FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserNationalID(username) {
//   var request = new request("SELECT C.NationalID FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserCustomerPicture(username) {
//   var request = new request("SELECT C.CustomerPicture FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserCancel(username) {
//   var request = new request("SELECT C.Cancel FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
//   function getUserReservable(username) {
//   var request = new request("SELECT C.Reservable FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// //*******************************************************Customer's Setter***********************************************
// function setUserUsername(username, newUsername) {
//   var request = new request("UPDATE dbo.Customer C SET C.Username = ' " + newUsername + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserPassword(username, password) {
//   var request = new request("UPDATE dbo.Customer C SET C.Password =  ' " + password + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserEmail(username, email) {
//   var request = new request("UPDATE dbo.Customer C SET C.Email =  ' " + email + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserFirstName(username, firstname) {
//   var request = new request("UPDATE dbo.Customer C SET C.FirstName =  ' " + firstname + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserLastName(username, lastname) {
//   var request = new request("UPDATE dbo.Customer C SET C.LastName =  ' " + lastname + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserCustomerType(username, customertype) {
//   var request = new request("UPDATE dbo.Customer C SET C.customerType =  ' " + customertype + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserStudentID(username, studentid) {
//   var request = new request("UPDATE dbo.Customer C SET C.StudentID =  ' " + studentid + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserProfessorID(username, professorid) {
//   var request = new request("UPDATE dbo.Customer C SET C.ProfessorID =  ' " + professorid + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserNationalID(username, nationalid) {
//   var request = new request("UPDATE dbo.Customer C SET C.NationalID =  ' " + nationalid + " ' WHERE C.Username = ' " + username + " ' "
//     ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserCustomerPicture(username, customerpicture) {
//   var request = new request("UPDATE dbo.Customer C SET C.CustomerPicture =  ' " + customerpicture + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserCancel(username, cancel) {
//   var request = new request("UPDATE dbo.Customer C SET C.Cancel =  ' " + cancel + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setUserReservable(username, reservable) {
//   var request = new request("UPDATE dbo.Customer C SET C.Reservable =  ' " + reservable + " ' WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// //*******************************************************Customer's Remover***********************************************
// function removeUser(username) {
//   var request = new request("DELETE FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
//
//
//
//
//
//
//
// //*******************************************************Car's Getter***********************************************
// function getCarOwner(platenumber, username) {
//   var request = new request("SELECT C.Username FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getCarPlateNumber(platenumber, username) {
//   var request = new request("SELECT C.PlateNumber FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getCarBrand(platenumber, username) {
//   var request = new request("SELECT C.CarBrand FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getCarModel(platenumber, username) {
//   var request = new request("SELECT C.CarModel FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getCarPicture(platenumber, username) {
//   var request = new request("SELECT C.CarPicture FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getCarColor(platenumber, username) {
//   var request = new request("SELECT C.CarColor FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// //*******************************************************Car's Setter***********************************************
// function setCarPlateNumber(platenumber, username, newPlatenumber) {
//   var request = new request("UPDATE dbo.Car C SET C.PlateNumber = ' " + newPlatenumber + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setCarBrand(platenumber, username, carbrand) {
//   var request = new request("UPDATE dbo.Car C SET C.CarBrand = ' " + carbrand + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setCarModel(platenumber, username, carmodel) {
//   var request = new request("UPDATE dbo.Car C SET C.CarModel = ' " + carmodel + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setCarPicture(platenumber, username, carpicture) {
//   var request = new request("UPDATE dbo.Car C SET C.CarPicture = ' " + carpicture + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setCarColor(platenumber, username, carcolor) {
//   var request = new request("UPDATE dbo.Car C SET C.CarColor = ' " + carcolor + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// //*******************************************************Car's Adder***********************************************
// function Car(platenumber, username, carbrand, carmodel, carpicture, carcolor) {
//   var request = new Request("INSERT INTO dbo.Reserve (PlateNumber,Username,CarBrand,CarModel,CarPicture,CarColor) values (@PlateNumber,@Username,@CarBrand,@CarModel,@CarPicture,@CarColor)",
//     //CustomerPicture,profilePic
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//
//   request.addParameter('PlateNumber', TYPES.VarChar, platenumber);
//   request.addParameter('Username', TYPES.VarChar, username);
//   request.addParameter('CarBrand', TYPES.VarChar, carbrand);
//   request.addParameter('CarModel', TYPES.VarChar, carmodel);
//   request.addParameter('CarPicture', TYPES.VarChar, carpicture);
//   request.addParameter('CarColor', TYPES.VarChar, carcolor);
//
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   })
//   connection.execSql(request);
// }
//
// //*******************************************************Car's Remover***********************************************
// function removeCar(platenumber, username) {
//   var request = new request("DELETE FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
//
//
//
//
//
//
//
// //*******************************************************Building's Getter***********************************************
// function getBuildingName(buildingname) {
//   var request = new request("SELECT B.BuildingName FROM dbo.Building B WHERE B.BuildingName = ' " + buildingname + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getBuildingCapacity(buildingname) {
//   var request = new request("SELECT B.Capacity FROM dbo.Building B WHERE B.BuildingName = ' " + buildingname + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// //*******************************************************Building's Setter***********************************************
// function setBuildingName(buidlingname, newBuildingname) {
//   var request = new request("UPDATE dbo.Building B SET B.BuildingName = ' " + newBuildingname + " ' WHERE B.BuildingName ' " + buildingname + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setBuildingCapacity(buidlingname, capacity) {
//   var request = new request("UPDATE dbo.Building B SET B.Capacity = ' " + capacity + " ' WHERE B.BuildingName ' " + buildingname + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// //*******************************************************Building's Adder***********************************************
// function Building(buildingname, capacity) {
//   var request = new Request("INSERT INTO dbo.Reserve (BuildingName,Capacity) values (@BuildingName,@Capacity)",
//     //CustomerPicture,profilePic
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//
//   request.addParameter('BuildingName', TYPES.VarChar, buildingname);
//   request.addParameter('Capacity', TYPES.VarChar, capacity);
//
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   })
//   connection.execSql(request);
// }
//
// //*******************************************************Building's Remover***********************************************
// function removeBuilding(buildingname) {
//   var request = new request("DELETE FROM dbo.Building B WHERE B.BuildingName = ' " + buildingname + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
//
//
//
//
//
//
//
// //*******************************************************Parking Spot's Getter***********************************************
// function getParkingSpotBuildingName(floor, slot, buildingname) {
//   var request = new request("SELECT P.BuildingName FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getParkingSpotFloor(floor, slot, buildingname) {
//   var request = new request("SELECT P.Floor FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getParkingSpotSlot(floor, slot, buildingname) {
//   var request = new request("SELECT P.Slot FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getParkingSpotOccupied(floor, slot, buildingname) {
//   var request = new request("SELECT P.isFull FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getParkingSpotSensor(floor, slot, buildingname) {
//   var request = new request("SELECT P.Sensor FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// //*******************************************************Parking Spot's Setter***********************************************
// function setParkingSpotFloor(floor, slot, buildingname, newFloor) {
//   var request = new request("UPDATE dbo.ParkingSpot P SET P.Floor = ' " + newFloor + " ' WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setParkingSpotSlot(floor, slot, buildingname, newSlot) {
//   var request = new request("UPDATE dbo.ParkingSpot P SET P.Slot = ' " + newSlot + " ' WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setParkingSpotOccupied(floor, slot, buildingname, isfull) {
//   var request = new request("UPDATE dbo.ParkingSpot P SET P.isFull = ' " + isfull + " ' WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setParkingSpotSensor(floor, slot, buildingname, sensor) {
//   var request = new request("UPDATE dbo.ParkingSpot P SET P.Sensor = ' " + sensor + " ' WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// //*******************************************************Parking Spot's Adder***********************************************
// function ParkingSpot(floor, slot, buildingname,isfull,sensor) {
//   var request = new Request("INSERT INTO dbo.Reserve (Floor,Slot,BuildingName,isFull,Sensor) values (@Floor,@Slot,@BuildingName,@isFull,@Sensor)",
//     //CustomerPicture,profilePic
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//
//   request.addParameter('Flooor', TYPES.VarChar, floor);
//   request.addParameter('Slot', TYPES.VarChar, slot);
//   request.addParameter('BuildingName', TYPES.VarChar, buildingname);
//   request.addParameter('isFull', TYPES.VarChar, isfull);
//   request.addParameter('Sensor', TYPES.VarChar, sensor);
//
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   })
//   connection.execSql(request);
// }
//
// //*******************************************************ParkingSpot's Remover***********************************************
// function removeParkingSpot(floor, slot, buildingname) {
//   var request = new request("DELETE FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
//
//
//
//
//
//
//
// //*******************************************************Reserve's Getter***********************************************
// function getReservePlateNumber(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.PlateNumber FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getReserveUsername(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.Username FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getReserveBuildingName(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.BuildingName FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getReserveBuildingFloor(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.Floor FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getReserveBuildingSlot(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.Slot FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getReserveQRCodeIn(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.QRCodeIn FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getReserveQRCodeOut(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.QRCodeOut FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getReserveTimeIn(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.Time_In FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getReserveTimeOut(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.Time_Out FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getReserveID(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.ReserveID FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getHasPaid(platenumber,username, floor, slot, buildingname) {
//   var request = new request("SELECT R.hasPaid FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
// //*******************************************************Reserve's Setter***********************************************
// function setReserveQRCodeIn(platenumber,username, floor, slot, buidlingname, qrcode) {
//   var request = new request("UPDATE dbo.Reserve R SET R.QRCodeIn = ' " + qrcode + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setReserveQRCodeOut(platenumber,username, floor, slot, buidlingname, qrcode) {
//   var request = new request("UPDATE dbo.Reserve R SET R.QRCodeOut = ' " + qrcode + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setReserveTimeIn(platenumber,username, floor, slot, buidlingname, time) {
//   var request = new request("UPDATE dbo.Reserve R SET R.Time_In = ' " + time + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setReserveTimeOut(platenumber,username, floor, slot, buidlingname, time) {
//   var request = new request("UPDATE dbo.Reserve R SET R.Time_Out = ' " + time + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setReserveID(platenumber,username, floor, slot, buidlingname, reserveid) {
//   var request = new request("UPDATE dbo.Reserve R SET R.ReserveID = ' " + reserveid + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setReservePaidStatus(platenumber,username, floor, slot, buidlingname, haspaid) {
//   var request = new request("UPDATE dbo.Reserve R SET R.hasPaid = ' " + haspaid + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// //*******************************************************Reserve's Adder***********************************************
// function Reserve(platenumber, username, floor, slot, buildingname, qrcodeIn, qrcodeOut, timeIn, timeOut, reserveid, haspaid) {
//   var request = new Request("INSERT INTO dbo.Reserve (PlateNumber,Username,Floor,Slot,BuildingName,QRCodeIn,QRCodeOut,Time_In,Time_Out,ReserveID,hasPaid) values (@PlateNumber,@Username,@Floor,@Slot,@BuildingName,@QRCodeIn,@QRCodeOut,@Time_In,@Time_Out,@ReserveID,@hasPaid)",
//     //CustomerPicture,profilePic
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//
//   request.addParameter('PlateNumber', TYPES.VarChar, platenumber);
//   request.addParameter('Username', TYPES.VarChar, username);
//   request.addParameter('Flooor', TYPES.VarChar, floor);
//   request.addParameter('Slot', TYPES.VarChar, slot);
//   request.addParameter('BuildingName', TYPES.VarChar, buildingname);
//   request.addParameter('QRCodeIn', TYPES.VarChar, qrcodeIn);
//   request.addParameter('QRCodeOut', TYPES.VarChar, qrcodeOut);
//   request.addParameter('Time_In', TYPES.VarChar, timeIn);
//   request.addParameter('Time_Out', TYPES.VarChar, timeOut);
//   request.addParameter('ReserveID', TYPES.VarChar, reserveID);
//   request.addParameter('hasPaid', TYPES.VarChar, haspaid);
//
//
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   })
//   connection.execSql(request);
// }
//
// //*******************************************************Reserve's Remover***********************************************
// function removeReserve(platenumber, username, floor, slot, buidlingname) {
//   var request = new request("DELETE FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
//
//
//
//
//
//
//
// //*******************************************************Transaction's Getter***********************************************
// function getTransactionID(platenumber, username, floor, slot, buidlingname) {
//   var request = new request("SELECT T.TransactionID FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getTransactionUsername(platenumber,username, floor, slot, buidlingname) {
//   var request = new request("SELECT T.Username FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getTransactionPlateNumber(platenumber,username, floor, slot, buidlingname) {
//   var request = new request("SELECT T.PlateNumber FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getTransactionBuilding(platenumber,username, floor, slot, buidlingname) {
//   var request = new request("SELECT T.BuildingName FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getTransactionParkingSpotFloor(platenumber,username, floor, slot, buidlingname) {
//   var request = new request("SELECT T.Floor FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getTransactionParkingSpotSlot(platenumber,username, floor, slot, buidlingname) {
//   var request = new request("SELECT T.Slot FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getTransactionFee(platenumber,username, floor, slot, buidlingname) {
//   var request = new request("SELECT T.Fee FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getTransactionPaymentMethod(platenumber,username, floor, slot, buidlingname) {
//   var request = new request("SELECT T.PaymentMethod FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// function getTransactionTotalTIme(platenumber,username, floor, slot, buidlingname) {
//   var request = new request("SELECT T.TotalTime FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
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
//
// //*******************************************************Transaction's Setter***********************************************
// function setTransactionID(platenumber,username, floor, slot, buidlingname, newTransactionid) {
//   var request = new request("UPDATE dbo.TransactionReceipt T SET T.TransactionID = ' " + newTransactionid + " ' WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setTransactionFee(platenumber,username, floor, slot, buidlingname, fee) {
//   var request = new request("UPDATE dbo.TransactionReceipt T SET T.Fee = ' " + fee + " ' WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setTransactionPaymentMethod(platenumber,username, floor, slot, buidlingname, paymentmethod) {
//   var request = new request("UPDATE dbo.TransactionReceipt T SET T.PaymentMethod = ' " + paymentmethod + " ' WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// function setTransactionTotalTime(platenumber,username, floor, slot, buidlingname, totaltime) {
//   var request = new request("UPDATE dbo.TransactionReceipt T SET T.TotalTime = ' " + totaltime + " ' WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
//
// //*******************************************************Reserve's Adder***********************************************
// function Transaction(platenumber,username, floor, slot, buidlingname, transactionid, fee, paymentmethod, totaltime) {
//   var request = new Request("INSERT INTO dbo.TransactionReceipt (PlateNumber,Username,Floor,Slot,BuidlingName,TransactionID,Fee,PaymentNethod,TotalTime) values (@PlateNumber,@Username,@Floor,@Slot,@BuidlingName,@TransactionID,@Fee,@PaymentNethod,@TotalTime)",
//     //CustomerPicture,profilePic
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//
//   request.addParameter('PlateNumber', TYPES.VarChar, platenumber);
//   request.addParameter('Username', TYPES.VarChar, username);
//   request.addParameter('BuildingName', TYPES.VarChar, buildingname);
//   request.addParameter('Floor', TYPES.VarChar, floor);
//   request.addParameter('Slot', TYPES.VarChar, slot);
//   request.addParameter('TransactionID', TYPES.VarChar, transactionid);
//   request.addParameter('Fee', TYPES.VarChar, fee);
//   request.addParameter('PaymentMethod', TYPES.VarChar, paymentmethod);
//   request.addParameter('TotalTime', TYPES.VarChar, totaltime);
//
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   })
//   connection.execSql(request);
// }
//
// //*******************************************************Transaction's Remover***********************************************
// function removeTransaction(platenumber,username, floor, slot, buidlingname) {
//   var request = new request("DELETE FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
//     function(err, rowCount, rows) {
//       if (err) {
//         done(err);
//       } else {
//
//       }
//     });
//   request.on('requestCompleted', function() {
//     //connection.close();
//     //error here
//   });
//   connection.execSql(request);
// }
