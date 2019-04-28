var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;


//*******************************************************Create class object***********************************************
exports.createReserve = function() {
   this.reserveStatus = null;
   this.reservePlatenumber = null;
   this.reserveBrand = null;
   this.reserveModel = null;
   this.reserveColor = null;
   this.reserveCarPicture = null;
   this.reserveBuildingname = null;
   this.reserveFloor = null;
   this.reserveSlot = null;
   this.reserveMap = null;
   this.reserveId = null;
   this.reserveIsfull = null;
   this.reserveTimein = null;
   this.reserveTimeout = null;
   this.reserveQRin = null;
   this.reserveQRout = null;
   this.qrCode = null;
   this.currentFee = null;
   this.currentTime = null;
}

//*******************************************************Inserting new Reserve into database***********************************************
exports.Reserve = function(connection,platenumber, username, floor, slot, buildingname, reserveid){
  var request = new Request('INSERT INTO dbo.Reserve (PlateNumber,Username,Floor,Slot,BuildingName,QRCodeIn,QRCodeOut,Time_In,Time_Out,reserveStatus,reserveID,hasPaid) VALUES (@platenumber,@username,@floor,@slot,@buildingname,@qrcodein,@qrcodeout,@time_in,@time_out,@reservestatus,@reserveid,@haspaid)',
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
  request.addParameter('time_in',TYPES.VarChar,'initialize');
  request.addParameter('time_out',TYPES.VarChar,'initialize');
  request.addParameter('reservestatus',TYPES.VarChar,'Reserved');
  request.addParameter('reserveid',TYPES.VarChar,reserveid);
  request.addParameter('haspaid',TYPES.Bit,0);

  request.on('Done',function(err, rowCount, rows){
  });

  connection.execSql(request);
}

//*******************************************************Reserve's Getter***********************************************
exports.getAllTimeIn = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Time_In FROM dbo.Reserve WHERE Username = @username',
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

exports.getAllTimeOut = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Time_Out FROM dbo.Reserve WHERE Username = @username',
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
        return Callback(returnedValue[0]);
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
        return Callback(returnedValue[0]);
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
        return Callback(returnedValue[0]);
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
        return Callback(returnedValue[0]);
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
        return Callback(returnedValue[0]);
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

exports.getReserveStatus = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT reserveStatus FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getReserveID = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT ReserveID FROM dbo.Reserve WHERE username = @username and reserveStatus != @reservestatus',
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
    request.addParameter('reservestatus',TYPES.VarChar,"Checked Out");
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getPlateNumber = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT PlateNumber FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getFloor = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Floor FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getSlot = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Slot FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getBuildingname = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT BuildingName FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getCurrentFee = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT currentFee FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getCurrentTime = function(connection,reserveid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT currentTime FROM dbo.Reserve WHERE ReserveID = @reserveid',
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
    request.addParameter('reserveid',TYPES.VarChar,reserveid);
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

exports.setReserveStatus = function(connection,reserveid,reservestatus) {
  var request = new Request("UPDATE dbo.Reserve SET reserveStatus = @reservestatus WHERE ReserveID = @reserveid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('reservestatus',TYPES.VarChar,reservestatus);
  request.addParameter('reserveid',TYPES.VarChar,reserveid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setCurrentFee = function(connection,reserveid,currentfee) {
  var request = new Request("UPDATE dbo.Reserve SET currentFee = @currentfee WHERE ReserveID = @reserveid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('currentfee',TYPES.VarChar,currentfee);
  request.addParameter('reserveid',TYPES.VarChar,reserveid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setCurrentTime = function(connection,reserveid,currenttime) {
  var request = new Request("UPDATE dbo.Reserve SET currentTime = @currentTime WHERE ReserveID = @reserveid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('currenttime',TYPES.VarChar,currenttime);
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
