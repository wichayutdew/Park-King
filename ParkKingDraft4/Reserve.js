var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;

//*******************************************************Inserting new Reserve into database***********************************************
exports.Reserve = function(connection,platenumber, username, floor, slot, buildingname, reserveid){
  var request = new Request('INSERT INTO dbo.Reserve (PlateNumber,Username,Floor,Slot,BuildingName,QRCodeIn,QRCodeOut,Time_In,Time_Out,reserveID,hasPaid) VALUES (@platenumber,@username,@floor,@slot,@buildingname,@qrcodein,@qrcodeout,@time_in,@time_out,@reserveid,@haspaid)',
      function(err, rowCount, rows){
          if(err){
              console.log(err);
              connection.release();
          }else{
              console.log('Reserve!!!');
              connection.release();
          }
  });
  request.addParameter('platenumber',TYPES.VarChar,platenumber);
  request.addParameter('username',TYPES.VarChar,username);
  request.addParameter('floor',TYPES.VarChar,floor);
  request.addParameter('slot',TYPES.VarChar,slot);
  request.addParameter('buildingname',TYPES.VarChar,buildingname);
  request.addParameter('qrcodein',TYPES.VarChar,null);
  request.addParameter('qrcodeout',TYPES.VarChar,null);
  request.addParameter('time_in',TYPES.VarChar,null);
  request.addParameter('time_out',TYPES.VarChar,null);
  request.addParameter('reserveid',TYPES.VarChar,reserveid);
  request.addParameter('haspaid',TYPES.Bit,0);

  request.on('Done',function(err, rowCount, rows){
  });

  connection.execSql(request);
}

//*******************************************************Reserve's Getter***********************************************
exports.getQRCodeIn = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT QRCodeIn FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getQRCodeOut = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT QRCodeOut FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getTimeIn = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Time_In FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getTimeOut = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Time_Out FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getHasPaid = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT hasPaid FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.reserved = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT COUNT(*) FROM dbo.Reserve WHERE Username = @username',
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
//*******************************************************Reserve's Setter***********************************************
exports.setQRCodeIn = function(connection,reserveid,qrcodein) {
  var request = new Request("UPDATE dbo.Reserve SET QRCodeIn = @qrcodein WHERE ReserveID = @reserveid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('qrcodein',TYPES.VarChar,qrcodein);
  request.addParameter('reserveid',TYPES.VarChar,reserveid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setQRCodeOut = function(connection,reserveid,qrcodeout) {
  var request = new Request("UPDATE dbo.Reserve SET QRCodeOut = @qrcodeout WHERE ReserveID = @reserveid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('qrcodeout',TYPES.VarChar,qrcodeout);
  request.addParameter('reserveid',TYPES.VarChar,reserveid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setTimeIn = function(connection,reserveid,timein) {
  var request = new Request("UPDATE dbo.Reserve SET Time_In = @timein WHERE ReserveID = @reserveid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('timein',TYPES.VarChar,timein);
  request.addParameter('reserveid',TYPES.VarChar,reserveid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setTimeOut = function(connection,reserveid,timeOut) {
  var request = new Request("UPDATE dbo.Reserve SET Time_Out = @timeOut WHERE ReserveID = @reserveid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('timeOut',TYPES.VarChar,timeOut);
  request.addParameter('reserveid',TYPES.VarChar,reserveid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setHasPaid = function(connection,reserveid,haspaid) {
  var request = new Request("UPDATE dbo.Reserve SET hasPaid = @haspaid WHERE ReserveID = @reserveid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('haspaid',TYPES.Bit,haspaid);
  request.addParameter('reserveid',TYPES.VarChar,reserveid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

//*******************************************************Reserve's Remover***********************************************
exports.removeReserve = function(connection,reserveid) {
  var request = new Request("DELETE FROM dbo.Reserve WHERE ReserveID = @reserveid",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
      }
    });
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('requestCompleted', function() {
      //connection.close();
    });
    connection.execSql(request);
}
//*******************************************************Reserve's checker***********************************************
exports.checkINcheck = function(connection,username,Callback){
  var returnedValue  = [];
  var request = new Request(
    'SELECT QRCodeIn,reserveID FROM dbo.Reserve WHERE Username = @username AND hasPaid = @notPaid',
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
        return Callback(returnedValue);
      }
    });
    request.addParameter('username',TYPES.VarChar,username);
    request.addParameter('notPaid',TYPES.Bit,0);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}
exports.checkOUTcheck = function(connection,username,Callback){
  var returnedValue  = [];
  var request = new Request(
    'SELECT TransactionID FROM dbo.TransactionReceipt WHERE Username = @username',
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
