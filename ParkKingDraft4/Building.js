var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;

//*******************************************************Inserting new building into database***********************************************
exports.insert_newBuilding = function(connection,buildingname,capacity){
  var request = new Request('INSERT INTO dbo.Building (BuildingName,Capacity) VALUES (@buidlingname,@capacity)',
      function(err, rowCount, rows){
          if(err){
              console.log(err);
              connection.release();
          }else{
              console.log('Building added!!!');
              connection.release();
          }
  });
  request.addParameter('buildingname',TYPES.VarChar,buidlingname);
  request.addParameter('capacity',TYPES.VarChar,capacity);

  request.on('Done',function(err, rowCount, rows){
  });

  connection.execSql(request);
}

//*******************************************************Building's Getter***********************************************
exports.getBuildingCapacity = function(connection,buildingname,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Capacity FROM dbo.Buildingname WHERE BuildingName = @buildingname',
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
    request.addParameter('buildingname',TYPES.VarChar,buildingname);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

//*******************************************************Building's Setter***********************************************
exports.setBuildingCapacity = function(connection,buildingname,capacity) {
  var request = new Request("UPDATE dbo.Buidling SET Capacity = @capacity WHERE Buildingname = @buildingname",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('buildingname',TYPES.VarChar,buildingname);
  request.addParameter('capacity',TYPES.VarChar,capacity);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Building's Remover***********************************************
exports.removeBuilding = function(connection,buildingname) {
  var request = new Request("DELETE FROM dbo.Building WHERE BuildingName = @buidlingname",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
      }
    });
    request.addParameter('buildingname',TYPES.VarChar,buildingname);
    request.on('requestCompleted', function() {
      //connection.close();
    });
    connection.execSql(request);
}
