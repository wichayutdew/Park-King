var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;

//*******************************************************Inserting new ParkingSpot into database***********************************************
exports.insert_newParkingSpot = function(connection,buildingname,floor,slot){
  var request = new Request('INSERT INTO dbo.ParkingSpot (BuildingName,Floor,Slot,isFull) VALUES (@buidlingname,@floor,@slot,@isfull)',
      function(err, rowCount, rows){
          if(err){
              console.log(err);
              connection.release();
          }else{
              console.log('ParkingSpot added!!!');
              connection.release();
          }
  });
  request.addParameter('buildingname',TYPES.VarChar,buidlingname);
  request.addParameter('floor',TYPES.VarChar,floor);
  request.addParameter('slot',TYPES.VarChar,slot);
  request.addParameter('isfull',TYPES.Bit,0);

  request.on('Done',function(err, rowCount, rows){
  });

  connection.execSql(request);
}

//*******************************************************ParkingSpot's Getter***********************************************
exports.getIsFull = function(connection,buildingname,floor,slot,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT isFull FROM dbo.ParkingSpot WHERE BuildingName = @buildingname AND Floor = @floor AND Slot = @slot',
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
    request.addParameter('buildingname',TYPES.VarChar,buidlingname);
    request.addParameter('floor',TYPES.VarChar,floor);
    request.addParameter('slot',TYPES.VarChar,slot);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getSensor = function(connection,buildingname,floor,slot,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Sensor FROM dbo.ParkingSpot WHERE BuildingName = @buildingname AND Floor = @floor AND Slot = @slot',
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
    request.addParameter('buildingname',TYPES.VarChar,buidlingname);
    request.addParameter('floor',TYPES.VarChar,floor);
    request.addParameter('slot',TYPES.VarChar,slot);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getLowestSpot = function(connection,buildingname,Callback){
  var returnedValue  = [][];
  var request = new Request("SELECT Floor, Spot FROM dbo.ParkingSpot WHERE BuildingName @buildingname AND isFull = '0' ORDER BY Floor ASC, Spot ASC",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
      returnedValue = null;
    } else {
      connection.release();
      return Callback(returnedValue[0][0]);
    }
  });
  request.addParameter('buildingname',TYPES.VarChar,buidlingname);
  request.on('row', function (columns) {
      columns.forEach(function(column) {
          returnedValue.push(column.value);
      });
  });
}

exports.getTotalFreeSpot = function(connection,buildingname,Callback) {
  var returnedValue;
  var request = new Request(
    'SELECT COUNT(Spot) FROM dbo.ParkingSpot WHERE BuildingName = @buildingname AND isFull = '0'',
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
    request.addParameter('buildingname',TYPES.VarChar,buidlingname);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

//*******************************************************ParkingSpot's Setter***********************************************
exports.setIsFull = function(connection,buildingname,floor,slot,isfull) {
  var request = new Request("UPDATE dbo.ParkingSpot SET isFUll = @isfull WHERE Buildingname = @buildingname AND Floor = @floor AND Slot = @slot",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('buildingname',TYPES.VarChar,buidlingname);
  request.addParameter('floor',TYPES.VarChar,floor);
  request.addParameter('slot',TYPES.VarChar,slot);
  request.addParameter('isfull',TYPES.Bit,isfull);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setSensor = function(connection,buildingname,floor,slot,sensor) {
  var request = new Request("UPDATE dbo.ParkingSpot SET Sensor = @sensor WHERE Buildingname = @buildingname AND Floor = @floor AND Slot = @slot",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('buildingname',TYPES.VarChar,buidlingname);
  request.addParameter('floor',TYPES.VarChar,floor);
  request.addParameter('slot',TYPES.VarChar,slot);
  request.addParameter('sensor',TYPES.Bit,sensor);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************ParkingSpot's Remover***********************************************
exports.removeParkingspot = function(connection,buildingname,floor,slot) {
  var request = new Request("DELETE FROM dbo.ParkingSpot WHERE BuildingName = @buidlingname AND Floor = @floor AND Slot = @slot",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
      }
    });
    request.addParameter('buildingname',TYPES.VarChar,buidlingname);
    request.addParameter('floor',TYPES.VarChar,floor);
    request.addParameter('slot',TYPES.VarChar,slot);
    request.on('requestCompleted', function() {
      //connection.close();
    });
    connection.execSql(request);
}
