var express = require('express');
var bodyParser = require('body-parser');
var Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;
var TYPES =require('tedious').TYPES;

//*******************************************************Reserve's Getter***********************************************
function getReservePlateNumber(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.PlateNumber FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getReserveUsername(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.Username FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getReserveBuildingName(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.BuildingName FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getReserveBuildingFloor(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.Floor FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getReserveBuildingSlot(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.Slot FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getReserveQRCodeIn(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.QRCodeIn FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getReserveQRCodeOut(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.QRCodeOut FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getReserveTimeIn(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.Time_In FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getReserveTimeOut(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.Time_Out FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getReserveID(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.ReserveID FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function getHasPaid(platenumber,username, floor, slot, buildingname) {
  var request = new request("SELECT R.hasPaid FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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
function setReserveQRCodeIn(platenumber,username, floor, slot, buidlingname, qrcode) {
  var request = new request("UPDATE dbo.Reserve R SET R.QRCodeIn = ' " + qrcode + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function setReserveQRCodeOut(platenumber,username, floor, slot, buidlingname, qrcode) {
  var request = new request("UPDATE dbo.Reserve R SET R.QRCodeOut = ' " + qrcode + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function setReserveTimeIn(platenumber,username, floor, slot, buidlingname, time) {
  var request = new request("UPDATE dbo.Reserve R SET R.Time_In = ' " + time + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function setReserveTimeOut(platenumber,username, floor, slot, buidlingname, time) {
  var request = new request("UPDATE dbo.Reserve R SET R.Time_Out = ' " + time + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function setReserveID(platenumber,username, floor, slot, buidlingname, reserveid) {
  var request = new request("UPDATE dbo.Reserve R SET R.ReserveID = ' " + reserveid + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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

function setReservePaidStatus(platenumber,username, floor, slot, buidlingname, haspaid) {
  var request = new request("UPDATE dbo.Reserve R SET R.hasPaid = ' " + haspaid + " ' WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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
function Reserve(platenumber, username, floor, slot, buildingname, qrcodeIn, qrcodeOut, timeIn, timeOut, reserveid, haspaid) {
  var request = new Request("INSERT INTO dbo.Reserve (PlateNumber,Username,Floor,Slot,BuildingName,QRCodeIn,QRCodeOut,Time_In,Time_Out,ReserveID,hasPaid) values (@PlateNumber,@Username,@Floor,@Slot,@BuildingName,@QRCodeIn,@QRCodeOut,@Time_In,@Time_Out,@ReserveID,@hasPaid)",
    //CustomerPicture,profilePic
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });

  request.addParameter('PlateNumber', TYPES.VarChar, platenumber);
  request.addParameter('Username', TYPES.VarChar, username);
  request.addParameter('Flooor', TYPES.VarChar, floor);
  request.addParameter('Slot', TYPES.VarChar, slot);
  request.addParameter('BuildingName', TYPES.VarChar, buildingname);
  request.addParameter('QRCodeIn', TYPES.VarChar, qrcodeIn);
  request.addParameter('QRCodeOut', TYPES.VarChar, qrcodeOut);
  request.addParameter('Time_In', TYPES.VarChar, timeIn);
  request.addParameter('Time_Out', TYPES.VarChar, timeOut);
  request.addParameter('ReserveID', TYPES.VarChar, reserveID);
  request.addParameter('hasPaid', TYPES.VarChar, haspaid);


  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  })
  connection.execSql(request);
}

//*******************************************************Reserve's Remover***********************************************
function removeReserve(platenumber, username, floor, slot, buidlingname) {
  var request = new request("DELETE FROM dbo.Reserve R WHERE R.PlateNumber = ' " + platenumber + "' R.Username = ' " + username + " ' AND R.BuildingName = ' " + buildingname + " ' AND R.Floor = ' " + floor + " ' AND R.Slot = ' " + slot + " ' ",
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
function getTransactionID(platenumber, username, floor, slot, buidlingname) {
  var request = new request("SELECT T.TransactionID FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function getTransactionUsername(platenumber,username, floor, slot, buidlingname) {
  var request = new request("SELECT T.Username FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function getTransactionPlateNumber(platenumber,username, floor, slot, buidlingname) {
  var request = new request("SELECT T.PlateNumber FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function getTransactionBuilding(platenumber,username, floor, slot, buidlingname) {
  var request = new request("SELECT T.BuildingName FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function getTransactionParkingSpotFloor(platenumber,username, floor, slot, buidlingname) {
  var request = new request("SELECT T.Floor FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function getTransactionParkingSpotSlot(platenumber,username, floor, slot, buidlingname) {
  var request = new request("SELECT T.Slot FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function getTransactionFee(platenumber,username, floor, slot, buidlingname) {
  var request = new request("SELECT T.Fee FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function getTransactionPaymentMethod(platenumber,username, floor, slot, buidlingname) {
  var request = new request("SELECT T.PaymentMethod FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function getTransactionTotalTIme(platenumber,username, floor, slot, buidlingname) {
  var request = new request("SELECT T.TotalTime FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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
function setTransactionID(platenumber,username, floor, slot, buidlingname, newTransactionid) {
  var request = new request("UPDATE dbo.TransactionReceipt T SET T.TransactionID = ' " + newTransactionid + " ' WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function setTransactionFee(platenumber,username, floor, slot, buidlingname, fee) {
  var request = new request("UPDATE dbo.TransactionReceipt T SET T.Fee = ' " + fee + " ' WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function setTransactionPaymentMethod(platenumber,username, floor, slot, buidlingname, paymentmethod) {
  var request = new request("UPDATE dbo.TransactionReceipt T SET T.PaymentMethod = ' " + paymentmethod + " ' WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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

function setTransactionTotalTime(platenumber,username, floor, slot, buidlingname, totaltime) {
  var request = new request("UPDATE dbo.TransactionReceipt T SET T.TotalTime = ' " + totaltime + " ' WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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
function Transaction(platenumber,username, floor, slot, buidlingname, transactionid, fee, paymentmethod, totaltime) {
  var request = new Request("INSERT INTO dbo.TransactionReceipt (PlateNumber,Username,Floor,Slot,BuidlingName,TransactionID,Fee,PaymentNethod,TotalTime) values (@PlateNumber,@Username,@Floor,@Slot,@BuidlingName,@TransactionID,@Fee,@PaymentNethod,@TotalTime)",
    //CustomerPicture,profilePic
    function(err, rowCount, rows) {
      if (err) {
        done(err);
      } else {

      }
    });

  request.addParameter('PlateNumber', TYPES.VarChar, platenumber);
  request.addParameter('Username', TYPES.VarChar, username);
  request.addParameter('BuildingName', TYPES.VarChar, buildingname);
  request.addParameter('Floor', TYPES.VarChar, floor);
  request.addParameter('Slot', TYPES.VarChar, slot);
  request.addParameter('TransactionID', TYPES.VarChar, transactionid);
  request.addParameter('Fee', TYPES.VarChar, fee);
  request.addParameter('PaymentMethod', TYPES.VarChar, paymentmethod);
  request.addParameter('TotalTime', TYPES.VarChar, totaltime);

  request.on('requestCompleted', function() {
    //connection.close();
    //error here
  })
  connection.execSql(request);
}

//*******************************************************Transaction's Remover***********************************************
function removeTransaction(platenumber,username, floor, slot, buidlingname) {
  var request = new request("DELETE FROM dbo.TransactionReceipt T WHERE T.PlateNumber = ' " + platenumber + "' T.Username = ' " + username + " ' AND T.BuildingName = ' " + buildingname + " ' AND T.Floor = ' " + floor + " ' AND T.Slot = ' " + slot + " ' ",
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
