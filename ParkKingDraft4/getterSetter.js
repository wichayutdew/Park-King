//*******************************************************Customer's Getter***********************************************
function getUserUsername(username) {
  var request = new request("SELECT C.Username FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getUserPassword(username) {
  var request = new request("SELECT C.Password FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.Email FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.FirstName FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.LastName FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.customerType FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.StudentID FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.ProfessorID FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.NationalID FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.CustomerPicture FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.Cancel FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("SELECT C.Reservable FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
  var request = new request("UPDATE dbo.Customer C SET C.Username = ' " + newUsername + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserPassword(username, password) {
  var request = new request("UPDATE dbo.Customer C SET C.Password =  ' " + password + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserEmail(username, email) {
  var request = new request("UPDATE dbo.Customer C SET C.Email =  ' " + email + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserFirstName(username, firstname) {
  var request = new request("UPDATE dbo.Customer C SET C.FirstName =  ' " + firstname + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserLastName(username, lastname) {
  var request = new request("UPDATE dbo.Customer C SET C.LastName =  ' " + lastname + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserCustomerType(username, customertype) {
  var request = new request("UPDATE dbo.Customer C SET C.customerType =  ' " + customertype + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserStudentID(username, studentid) {
  var request = new request("UPDATE dbo.Customer C SET C.StudentID =  ' " + studentid + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserProfessorID(username, professorid) {
  var request = new request("UPDATE dbo.Customer C SET C.ProfessorID =  ' " + professorid + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserNationalID(username, nationalid) {
  var request = new request("UPDATE dbo.Customer C SET C.NationalID =  ' " + nationalid + " ' WHERE C.Username = ' " + username + " ' "
    ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserCustomerPicture(username, customerpicture) {
  var request = new request("UPDATE dbo.Customer C SET C.CustomerPicture =  ' " + customerpicture + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserCancel(username, cancel) {
  var request = new request("UPDATE dbo.Customer C SET C.Cancel =  ' " + cancel + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setUserReservable(username, reservable) {
  var request = new request("UPDATE dbo.Customer C SET C.Reservable =  ' " + reservable + " ' WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Customer's Remover***********************************************
function removeUser(username) {
  var request = new request("DELETE FROM dbo.Customer C WHERE C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}








//*******************************************************Car's Getter***********************************************
function getCarPlateNumber(platenumber, username) {
  var request = new request("SELECT C.PlateNumber FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getCarOwner(platenumber, username) {
  var request = new request("SELECT C.Username FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getCarBrand(platenumber, username) {
  var request = new request("SELECT C.CarBrand FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getCarModel(platenumber, username) {
  var request = new request("SELECT C.CarModel FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getCarPicture(platenumber, username) {
  var request = new request("SELECT C.CarPicture FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getCarColor(platenumber, username) {
  var request = new request("SELECT C.Color FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

//*******************************************************Car's Setter***********************************************
function setCarPlateNumber(platenumber, username, newPlatenumber) {
  var request = new request("UPDATE dbo.Car C SET C.PlateNumber = ' " + newPlatenumber + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setCarBrand(platenumber, username, carbrand) {
  var request = new request("UPDATE dbo.Car C SET C.CarBrand = ' " + carbrand + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setCarModel(platenumber, username, carmodel) {
  var request = new request("UPDATE dbo.Car C SET C.CarModel = ' " + carmodel + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setCarPicture(platenumber, username, carpicture) {
  var request = new request("UPDATE dbo.Car C SET C.CarPicture = ' " + carpicture + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setCarColor(platenumber, username, carcolor) {
  var request = new request("UPDATE dbo.Car C SET C.CarColor = ' " + carcolor + " ' WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Car's Adder***********************************************
function Car(platenumber, username, carbrand, carmodel, carcolor, carpicture) {
  var request = new Request("INSERT INTO dbo.Reserve (PlateNumber,Username,CarBrand,CarModel,CarColor,CarPicture) values (@PlateNumber,@Username,@CarBrand,@CarModel,@CarColor,@CarPicture)",
    //CustomerPicture,profilePic
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });

  request.addParameter('PlateNumber', TYPES.VarChar, platenumber);
  request.addParameter('Username', TYPES.VarChar, username);
  request.addParameter('CarBrand', TYPES.VarChar, carbrand);
  request.addParameter('CarModel', TYPES.VarChar, carmodel);
  request.addParameter('CarColor', TYPES.VarChar, carcolor);
  request.addParameter('CarPicture', TYPES.VarChar, carpicture);

  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  })
  connection.execSql(request);
}

//*******************************************************Car's Remover***********************************************
function removeCar(platenumber, username) {
  var request = new request("DELETE FROM dbo.Car C WHERE C.PlateNumber = ' " + platenumber + " ' AND C.Username = ' " + username + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}








//*******************************************************Building's Getter***********************************************
function getBuildingName(buildingname) {
  var request = new request("SELECT B.BuildingName FROM dbo.Building B WHERE B.BuildingName = ' " + buildingname + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getBuildingCapacity(buildingname) {
  var request = new request("SELECT B.Capacity FROM dbo.Building B WHERE B.BuildingName = ' " + buildingname + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

//*******************************************************Building's Setter***********************************************
function setBuildingName(buidlingname, newBuildingname) {
  var request = new request("UPDATE dbo.Building B SET B.BuildingName = ' " + newBuildingname + " ' WHERE B.BuildingName ' " + buildingname + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setBuildingCapacity(buidlingname, capacity) {
  var request = new request("UPDATE dbo.Building B SET B.Capacity = ' " + capacity + " ' WHERE B.BuildingName ' " + buildingname + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Building's Adder***********************************************
function Building(buildingname, capacity) {
  var request = new Request("INSERT INTO dbo.Reserve (BuildingName,Capacity) values (@BuildingName,@Capacity)",
    //CustomerPicture,profilePic
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });

  request.addParameter('BuildingName', TYPES.VarChar, buildingname);
  request.addParameter('Capacity', TYPES.VarChar, capacity);

  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  })
  connection.execSql(request);
}

//*******************************************************Building's Remover***********************************************
function removeBuilding(buildingname) {
  var request = new request("DELETE FROM dbo.Building B WHERE B.BuildingName = ' " + buildingname + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}








//*******************************************************Parking Spot's Getter***********************************************
function getParkingSpotBuildingName(buildingname, floor, slot) {
  var request = new request("SELECT P.BuildingName FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getParkingSpotFloor(buildingname, floor, slot) {
  var request = new request("SELECT P.Floor FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getParkingSpotSlot(buildingname, floor, slot) {
  var request = new request("SELECT P.Slot FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getParkingSpotAvailability(buildingname, floor, slot) {
  var request = new request("SELECT P.isFull FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

//*******************************************************Parking Spot's Setter***********************************************
function setParkingSpotFloor(buidlingname, floor, slot, newFloor) {
  var request = new request("UPDATE dbo.ParkingSpot P SET P.Floor = ' " + newFloor + " ' WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setParkingSpotSlot(buidlingname, floor, slot, newSlot) {
  var request = new request("UPDATE dbo.ParkingSpot P SET P.Slot = ' " + newSlot + " ' WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setParkingSpotAvalability(buidlingname, floor, slot, isfull) {
  var request = new request("UPDATE dbo.ParkingSpot P SET P.isFull = ' " + isfull + " ' WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Parking Spot's Adder***********************************************
function ParkingSpot(floor, slot, buildingname, isfull) {
  var request = new Request("INSERT INTO dbo.Reserve (Floor,Slot,BuildingName,isFull) values (@Floor,@Slot,@BuildingName,@isFull)",
    //CustomerPicture,profilePic
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });

  request.addParameter('Flooor', TYPES.VarChar, floor);
  request.addParameter('Slot', TYPES.VarChar, slot);
  request.addParameter('BuildingName', TYPES.VarChar, buildingname);
  request.addParameter('isFull', TYPES.VarChar, isfull);

  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  })
  connection.execSql(request);
}

//*******************************************************ParkingSpot's Remover***********************************************
function removeParkingSpot(buidlingname, floor, slot) {
  var request = new request("DELETE FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.Floor = ' " + floor + " ' AND P.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}








//*******************************************************Reserve's Getter***********************************************
function getReserveUsername(username, buildingname, floor, slot) {
  var request = new request("SELECT R.Username FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getReserveBuildingName(username, buildingname, floor, slot) {
  var request = new request("SELECT R.BuildingName FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getReserveBuildingFloor(username, buildingname, floor, slot) {
  var request = new request("SELECT R.Floor FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getReserveBuildingSlot(username, buildingname, floor, slot) {
  var request = new request("SELECT R.Slot FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getReserveQRCodeIn(username, buildingname, floor, slot) {
  var request = new request("SELECT R.QRCodeIn FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getReserveQRCodeOut(username, buildingname, floor, slot) {
  var request = new request("SELECT R.QRCodeOut FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getReserveTimeIn(username, buildingname, floor, slot) {
  var request = new request("SELECT R.Time_In FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getReserveTimeOut(username, buildingname, floor, slot) {
  var request = new request("SELECT R.Time_Out FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getReserveID(username, buildingname, floor, slot) {
  var request = new request("SELECT R.ReserveID FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getHasPaid(username, buildingname, floor, slot) {
  var request = new request("SELECT R.hasPaid FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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
//*******************************************************Reserve's Setter***********************************************
function setReserveQRCodeIn(username, buidlingname, floor, slot, qrcode) {
  var request = new request("UPDATE dbo.Reserve R SET R.QRCodeIn = ' " + qrcode + " ' WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setReserveQRCodeOut(username, buidlingname, floor, slot, QRcode) {
  var request = new request("UPDATE dbo.Reserve R SET R.QRCodeOut = ' " + qrcode + " ' WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setReserveTimeIn(username, buidlingname, floor, slot, time) {
  var request = new request("UPDATE dbo.Reserve R SET R.Time_In = ' " + time + " ' WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setReserveTimeOut(username, buidlingname, floor, slot, time) {
  var request = new request("UPDATE dbo.Reserve R SET R.Time_Out = ' " + time + " ' WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setReserveID(username, buidlingname, floor, slot, reserveid) {
  var request = new request("UPDATE dbo.Reserve R SET R.ReserveID = ' " + reserveid + " ' WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setReserveID(username, buidlingname, floor, slot, haspaid) {
  var request = new request("UPDATE dbo.Reserve R SET R.hasPaid = ' " + haspaid + " ' WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Reserve's Adder***********************************************
function Reserve(qrcodeIn, qrcodeOut, timeIn, timeOut, reserveid,haspaid, username, floor, slot, buildingname) {
  var request = new Request("INSERT INTO dbo.Reserve (QRCodeIn,QRCodeOut,Time_In,Time_Out,ReserveID,hasPaid,Username,Floor,Slot,BuildingName) values (@QRCodeIn,@QRCodeOut,@Time_In,@Time_Out,@ReserveID,@hasPaid,@Username,@Floor,@Slot,@BuildingName)",
    //CustomerPicture,profilePic
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });

  request.addParameter('QRCodeIn', TYPES.VarChar, qrcodeIn);
  request.addParameter('QRCodeOut', TYPES.VarChar, qrcodeOut);
  request.addParameter('Time_In', TYPES.VarChar, timeIn);
  request.addParameter('Time_Out', TYPES.VarChar, timeOut);
  request.addParameter('ReserveID', TYPES.VarChar, reserveID);
  request.addParameter('hasPaid', TYPES.VarChar, haspaid);
  request.addParameter('Username', TYPES.VarChar, username);
  request.addParameter('Flooor', TYPES.VarChar, floor);
  request.addParameter('Slot', TYPES.VarChar, slot);
  request.addParameter('BuildingName', TYPES.VarChar, buildingname);

  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  })
  connection.execSql(request);
}

//*******************************************************Reserve's Remover***********************************************
function removeParkingSpot(username, buidlingname, floor, slot) {
  var request = new request("DELETE FROM dbo.Reserve R WHERE R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}








//*******************************************************Transaction's Getter***********************************************
function getTransactionID(transactionid, username) {
  var request = new request("SELECT T.TransactionID FROM dbo.Transaction T WHERE T.Username = ' " + username + " ' AND T.TransactionID = ' " + transactionid + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getTransactionUsername(transactionid, username) {
  var request = new request("SELECT T.Username FROM dbo.Transaction T WHERE T.Username = ' " + username + " ' AND T.TransactionID = ' " + transactionid + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getTransactionFee(transactionid, username) {
  var request = new request("SELECT T.Fee FROM dbo.Transaction T WHERE T.Username = ' " + username + " ' AND T.TransactionID = ' " + transactionid + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

function getTransactionPaymentMethod(transactionid, username) {
  var request = new request("SELECT T.PaymentMethod FROM dbo.Transaction T WHERE T.Username = ' " + username + " ' AND T.TransactionID = ' " + transactionid + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
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

//*******************************************************Transaction's Setter***********************************************
function setTransactionID(transactionid, username, newTransactionid) {
  var request = new request("UPDATE dbo.Transaction T SET T.TransactionID = ' " + newTransactionid + " '  WHERE T.Username = ' " + username + " ' AND T.TransactionID = ' " + transactionid + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setTransactionFee(transactionid, username, fee) {
  var request = new request("UPDATE dbo.Transaction T SET T.Fee = ' " + fee + " '  WHERE T.Username = ' " + username + " ' AND T.TransactionID = ' " + transactionid + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

function setTransactionPaymentMethod(transactionid, username, paymentmethod) {
  var request = new request("UPDATE dbo.Transaction T SET T.PaymentMethod = ' " + paymentmethod + " '  WHERE T.Username = ' " + username + " ' AND T.TransactionID = ' " + transactionid + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Reserve's Adder***********************************************
function Transaction(transactionid, username, fee, paymentmethod) {
  var request = new Request("INSERT INTO dbo.Transaction (TransactionID,Username,Fee,PaymentMethod) values (@TransactionID,@Username,@Fee,@PaymentMethod)",
    //CustomerPicture,profilePic
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });

  request.addParameter('TransactionID', TYPES.VarChar, transactionid);
  request.addParameter('Username', TYPES.VarChar, username);
  request.addParameter('Fee', TYPES.VarChar, fee);
  request.addParameter('PaymentMethod', TYPES.VarChar, paymentmethod);

  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  })
  connection.execSql(request);
}

//*******************************************************Transaction's Remover***********************************************
function removeTransaction(transactionid, username) {
  var request = new request("DELETE FROM dbo.Transaction T WHERE T.Username = ' " + username + " ' AND T.TransactionID = ' " + transactionid + " ' ",
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}
