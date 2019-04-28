var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;


//*******************************************************Create class object***********************************************
exports.createTransaction = function() {
   this.exceedCheckoutTime = null;
   this.transactionId = null;
   this.totaltime = null;
   this.parkingFee = null;
   this.addedFee = null;
   this.paymentmethod = null;
   this.date = null;
   this.totalTransaction = null;
   this.qrCode = null;
}

exports.createReceipt = function() {
  this.receiptFee = null;
  this.receiptTotaltime = null;
  this.receiptBuilding = null;
  this.receiptDate = null;
  this.receiptTimeIn = null;
  this.receiptTimeOut = null;
  this.receiptPaymentmethod = null;
  this.receiptPlatenumber = null;
}

//*******************************************************Transaction's Adder***********************************************
exports.Transaction = function(connection,platenumber,username,floor,slot,buildingname,transactionid,fee,paymentmethod,totaltime,date){
  var request = new Request('INSERT INTO dbo.TransactionReceipt (PlateNumber,Username,Floor,Slot,BuildingName,TransactionID,Fee,PaymentMethod,TotalTime,Date,transactionStatus,addedFee) VALUES (@platenumber,@username,@floor,@slot,@buildingname,@transactionid,@fee,@paymentmethod,@totaltime,@date,@transactionstatus,@addedfee)',
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
  request.addParameter('transactionid',TYPES.VarChar,transactionid);
  request.addParameter('fee',TYPES.VarChar,fee);
  request.addParameter('paymentmethod',TYPES.VarChar,paymentmethod);
  request.addParameter('totaltime',TYPES.VarChar,totaltime);
  request.addParameter('date',TYPES.VarChar,date);
  request.addParameter('transactionstatus',TYPES.VarChar,"Paid");
  request.addParameter('addedfee',TYPES.VarChar,0);

  request.on('Done',function(err, rowCount, rows){
  });

  connection.execSql(request);
}

//*******************************************************Transaction's Getter***********************************************
exports.getTransactionID = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT TransactionID FROM dbo.TransactionReceipt WHERE Username = @username AND transactionStatus = @transactionstatus',
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
    request.addParameter('transactionstatus',TYPES.VarChar,"Paid");
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getAddedFee = function(connection,transactionid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT addedFee FROM dbo.TransactionReceipt WHERE TransactionID = @transactionid',
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
    request.addParameter('transactionid',TYPES.VarChar,transactionid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getExceedCheckouttime = function(connection,transactionid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT exceedCheckouttime FROM dbo.TransactionReceipt WHERE TransactionID = @transactionid',
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
    request.addParameter('transactionid',TYPES.VarChar,transactionid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getFee = function(connection,transactionid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Fee FROM dbo.TransactionReceipt WHERE TransactionID = @transactionid',
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
    request.addParameter('transactionid',TYPES.VarChar,transactionid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getPaymentMethod = function(connection,transactionid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT PaymentMethod FROM dbo.TransactionReceipt WHERE TransactionID = @transactionid',
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
    request.addParameter('transactionid',TYPES.VarChar,transactionid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getTotalTime = function(connection,transactionid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT TotalTime FROM dbo.TransactionReceipt WHERE TransactionID = @transactionid',
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
    request.addParameter('transactionid',TYPES.VarChar,transactionid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getDate = function(connection,transactionid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Date FROM dbo.TransactionReceipt WHERE TransactionID = @transactionid',
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
    request.addParameter('transactionid',TYPES.VarChar,transactionid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}

exports.getAllTransaction = function(connection,username,Callback) {
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

exports.getAllDate = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Date FROM dbo.TransactionReceipt WHERE Username = @username',
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

exports.getAllBuilding = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT BuildingName FROM dbo.TransactionReceipt WHERE Username = @username',
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

exports.getAllPlateNumber = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT PlateNumber FROM dbo.TransactionReceipt WHERE Username = @username',
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

exports.getAllTotalTime = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT TotalTime FROM dbo.TransactionReceipt WHERE Username = @username',
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

exports.getAllFee = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT Fee FROM dbo.TransactionReceipt WHERE Username = @username',
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

exports.getAllPaymentMethod = function(connection,username,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT PaymentMethod FROM dbo.TransactionReceipt WHERE Username = @username',
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

exports.getTransactionStatus = function(connection,transactionid,Callback) {
  var returnedValue  = [];
  var request = new Request(
    'SELECT transactionStatus FROM dbo.Reserve WHERE TransactionID = @transactionid',
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
    request.addParameter('transactionid',TYPES.VarChar,transactionid);
    request.on('row', function (columns) {
        columns.forEach(function(column) {
            returnedValue.push(column.value);
        });
    });
    connection.execSql(request);
}
//*******************************************************Reserve's Setter***********************************************
exports.setFee = function(connection,transactionid,fee) {
  var request = new Request("UPDATE dbo.TransactionReceipt SET Fee = @fee WHERE TransactionID = @transactionid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('fee',TYPES.VarChar,fee);
  request.addParameter('transactionid',TYPES.VarChar,transactionid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setPaymentMethod = function(connection,transactionid,paymentmethod) {
  var request = new Request("UPDATE dbo.TransactionReceipt SET PaymentMethod = @paymentmethod WHERE TransactionID = @transactionid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('paymentmethod',TYPES.VarChar,paymentmethod);
  request.addParameter('transactionid',TYPES.VarChar,transactionid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setTotalTime = function(connection,transactionid,totaltime) {
  var request = new Request("UPDATE dbo.TransactionReceipt SET TotalTime = @totaltime WHERE TransactionID = @transactionid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('totaltime',TYPES.VarChar,totaltime);
  request.addParameter('transactionid',TYPES.VarChar,transactionid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setDate = function(connection,transactionid,fee) {
  var request = new Request("UPDATE dbo.TransactionReceipt SET Date = @date WHERE TransactionID = @transactionid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('date',TYPES.VarChar,date);
  request.addParameter('transactionid',TYPES.VarChar,transactionid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setTransactionStatus = function(connection,transactionid,transactionstatus) {
  var request = new Request("UPDATE dbo.TransactionReceipt SET transactionStatus = @transactionstatus WHERE TransactionID = @transactionid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('transactionstatus',TYPES.VarChar,transactionstatus);
  request.addParameter('transactionid',TYPES.VarChar,transactionid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setAddedFee = function(connection,transactionid,addedfee) {
  var request = new Request("UPDATE dbo.TransactionReceipt SET addedFee = @addedfee WHERE TransactionID = @transactionid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('addedfee',TYPES.VarChar,addedfee);
  request.addParameter('transactionid',TYPES.VarChar,transactionid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}

exports.setExceedCheckoutTime = function(connection,transactionid,exceedcheckouttime) {
  var request = new Request("UPDATE dbo.TransactionReceipt SET exceedCheckouttime = @exceedcheckouttime WHERE TransactionID = @transactionid",
  function(err, rowCount, rows) {
    if (err) {
      console.log(err);
      connection.release();
    } else {
      connection.release();
    }
  });
  request.addParameter('exceedcheckouttime',TYPES.VarChar,exceedcheckouttime);
  request.addParameter('transactionid',TYPES.VarChar,transactionid);
  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  });
  connection.execSql(request);
}
//*******************************************************Reserve's Remover***********************************************
exports.removeTransaction = function(connection,transactionid) {
  var request = new Request("DELETE FROM dbo.TransactionReceipt WHERE TransactionID = @transactionid",
    function(err, rowCount, rows) {
      if (err) {
        console.log(err);
        connection.release();
      } else {
        connection.release();
      }
    });
    request.addParameter('transactionid',TYPES.VarChar,transactionid);
    request.on('requestCompleted', function() {
      //connection.close();
    });
    connection.execSql(request);
}


exports.getCurrentDate = function(){
  var today = new Date();
  var date = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
  return date;
}
