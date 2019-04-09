var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;

//*******************************************************Inserting new car into database***********************************************
exports.insert_newCar= function(connection,car_info){
  var request = new Request('INSERT INTO dbo.Car(PlateNumber,Username,CarBrand,CarModel,CarPicture,CarColor) VALUES (@PlateNumber,@Username,@CarBrand,@CarModel,@CarPicture,@CarColor)',
      function(err, rowCount, rows){
          if(err){
              connection.release();
          }else{
              console.log('Car added!!!');
              connection.release();
          }
  });
  request.addParameter('PlateNumber',TYPES.VarChar,car_info.platenumber);
  request.addParameter('Username',TYPES.VarChar,car_info.username);
  request.addParameter('CarBrand',TYPES.VarChar,car_info.carbrand);
  request.addParameter('CarModel',TYPES.VarChar,car_info.carmodel);
  request.addParameter('CarPicture',TYPES.VarChar,car_info.carpicture);
  request.addParameter('CarColor',TYPES.VarChar,car_info.carcolor);

  request.on('Done',function(err, rowCount, rows){
  });

  connection.execSql(request);
}

//*******************************************************Customer's Getter***********************************************
exports.getAllPlateNumber = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT PlateNumber FROM dbo.Car WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue);
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

exports.getAllCarBrand = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT CarBrand FROM dbo.Car WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue);
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

exports.getAllCarModel = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT CarModel FROM dbo.Car WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue);
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

exports.getAllCarPicture = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT CarPicture FROM dbo.Car WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue);
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

exports.getAllCarColor = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT CarColor FROM dbo.Car WHERE Username = @username',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
        returnedValue = null;
      } else {
        connection.release();
        return Callback(returnedValue);
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
exports.setPlateNumber = function(connection,platenumber, username, newPlatenumber) {
  var request = new request("UPDATE dbo.Car C SET C.PlateNumber = @newPlatenumber WHERE C.PlateNumber = @platenumber AND C.Username = @username",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('newPlatenumber',TYPES.VarChar,newPlateNumber);
  request.addParameter('username',TYPES.VarChar,username);
  request.addParameter('platenumber',TYPES.VarChar,platenumber);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setOwner = function(connection,platenumber, username, newUsername) {
  var request = new request("UPDATE dbo.Car C SET C.Username = @newUsername WHERE C.PlateNumber = @platenumber AND C.Username = @username",
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
  request.addParameter('platenumber',TYPES.VarChar,platenumber);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setCarBrand = function(connection,platenumber, username, carbrand) {
  var request = new request("UPDATE dbo.Car C SET C.CarBrand = @carbrand WHERE C.PlateNumber = @platenumber AND C.Username = @username",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('carbrand',TYPES.VarChar,carbrand);
  request.addParameter('username',TYPES.VarChar,username);
  request.addParameter('platenumber',TYPES.VarChar,platenumber);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setCarModel = function(connection,platenumber, username, carmodel) {
  var request = new request("UPDATE dbo.Car C SET C.CarModel = @carmodel WHERE C.PlateNumber = @platenumber AND C.Username = @username",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('carmodel',TYPES.VarChar,carmodel);
  request.addParameter('username',TYPES.VarChar,username);
  request.addParameter('platenumber',TYPES.VarChar,platenumber);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setCarPicture = function(connection,platenumber, username, carpicture) {
  var request = new request("UPDATE dbo.Car C SET C.CarPicture = @carpicture WHERE C.PlateNumber = @platenumber AND C.Username = @username",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('carpicture',TYPES.VarChar,carpicture);
  request.addParameter('username',TYPES.VarChar,username);
  request.addParameter('platenumber',TYPES.VarChar,platenumber);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setCarColor = function(connection,platenumber, username, carcolor) {
  var request = new request("UPDATE dbo.Car C SET C.CarColor = @carcolor WHERE C.PlateNumber = @platenumber AND C.Username = @username",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('carcolor',TYPES.VarChar,carcolor);
  request.addParameter('username',TYPES.VarChar,username);
  request.addParameter('platenumber',TYPES.VarChar,platenumber);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.editCar = function(connection,platenumber,username,edited_info){
  var request = new request("UPDATE dbo.Car SET CarBrand = @carbrand, CarModel = @carmodel, CarColor = @carcolor, CarPicture = @carpicture WHERE Username = @username AND PlateNumber = @platenumber",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.addParameter('platenumber',TYPES.VarChar,platenumber);
    request.addParameter('carbrand',TYPES.VarChar,edited_info.carbrand);
    request.addParameter('carmodel',TYPES.VarChar,edited_info.carmodel);
    request.addParameter('carcolor',TYPES.VarChar,edited_info.carcolor);
    request.addParameter('carpicture',TYPES.VarChar,edited_info.carpicture);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}
//*******************************************************Customer's Remover***********************************************
exports.removeCar = function(connection,username,platenumber) {
  var request = new request("DELETE FROM dbo.Car C WHERE C.Username = @username AND C.PlateNumber = @platenumber",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.addParameter('platenumber',TYPES.VarChar,platenumber);
    request.on('requestCompleted', function() {
      //connection.close();
    });
    connection.execSql(request);
}
