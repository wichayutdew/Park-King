var Stopwatch = require('statman-stopwatch');
var stopwatch = new Stopwatch();

function elaspedTime() {
  var elaspedInterval = setInterval(function() {
    var time = parseInt(stopwatch.read()/1000);
    var hours = ~~(time / 3600);
    var min = ~~((time % 3600) / 60);
    var sec = time % 60;
    console.log(hours+":"+min+":"+sec);
  },1000);
}

function elaspedTimeStop(){
  var totalTime = parseInt(stopwatch.read()/1000);
  clearInterval(elaspedInterval);
  stopwatch.stop();
  return totalTime;
}

function countdownTimer(seconds) {
  var countdownInterval =  setInterval(function () {
        duration --;
        //console.log(duration);
        if(duration <= 0){
          clearInterval(countdownInterval);
        }
    }, 1000);
    return false;
}

function getCurrentTime(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

function checkAvailabiliy(buildingname){
  var request = new request("SELECT P.Floor, P.Spot FROM dbo.ParkingSpot P WHERE P.BuildingName = ' " + buildingname + " ' AND P.isfull = 0 ORDER BY Floor ASC, Spot ASC",
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
  return returnedValue[0];
}

function cancelFrequency(username){
  var cancel = getUserCancel(username);
  return cancel;
}

function generateTokenID(){
  //npm install uuid
  const uuidv4 = require('uuid/v4');
  var tokenID = uuidv4();
  return tokenID;
}

function generateQR(){

}

function openFlap(spot){
//motor
}

function closeFlap(spot){
//motor
}

function isQREqual(tokenID, qrcode){
  if(qrcode = tokenID){
    return true;
  }else{
    return false;
  }
}

function checkIn(username,buildingname,floor,slot){
  var check = isQREqual(getReserveID(username,buildingname,floor,slot),getReserveQRCodeIn(username,buildingname,floor,slot));
  if(check == true){// && arriveTimeout == false && isParked(buildingname, floor, slot) == false
    stopwatch.start();
    setParkingSpotOccupied(buidlingname, floor, slot, true);
  }
  //openFlap(reserve.getReserveID);
  //timer(30).start;
  //if(isParked){
  //  closeFlap(spot);
  //}
}

//true == pared, false == not parked
function isParked(buildingname, floor, slot){
  //check sensor that slot
  var value = getParkingSpotSensor(buildingname, floor, slot);
  return value;
}

// not used in real system prototype
function pay(transactionid){
//   link ebank somehow
   //setReservePaidStatus(username, buidlingname, floor, slot, haspaid);

}

function checkOut(username,builgingname,floor,slot,transactionid){
  var check = isQREqual(getTransactionID(transactionid,username) == getReserveQRCodeOut(username,builgingname,floor,slot));
  if(check == true){// && leftTimeout == false && isParked(buildingname, floor, slot) == false
    var totaltime = elaspedTimeStop();
    setParkingSpotOccupied(buidlingname, floor, slot, false);
    var parkingFee = Math.ceil(totaltime/3600) * 15;
    var transactionid = generateTokenID();
    var paymentmethod = 'Kbank';
    Transaction(transactionid, username, parkingFee, paymentmethod);
  }
}

function hasLeft(buildingname,floor,slot){
  if(isParked(buildingname,floor,slot) == true){// && leftTimeout == true
    setParkingSpotOccupied(buidlingname, floor, slot, true);
    closeFlap(spot);
    stopwatch.start();
  }
}

function makeReceipt(transactionID){
  var usernam = getTransactionUsername(transactionid, username);
  var transactionid = getTransactionID(transactionid, username);
  var parkingfee = getTransactionFee(transactionid, username);
  var payment method = getTransactionPaymentMethod(transactionid, username);
}
