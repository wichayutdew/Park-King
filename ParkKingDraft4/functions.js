var Stopwatch = require('statman-stopwatch');
var stopwatch = new Stopwatch();
var elaspedInterval = 0;
//stopwatch.start();
//elaspedTime();
//setTimeout(elaspedTimeStop,5000);

//show elasped time
function elaspedTime() {
  elaspedInterval = setInterval(function() {
    var time = parseInt(stopwatch.read()/1000);
    var hours = ~~(time / 3600);
    var min = ~~((time % 3600) / 60);
    var sec = time % 60;
    console.log(hours+":"+min+":"+sec);
  },1000);
}

//stop the stopwatch
function elaspedTimeStop(){
  var totalTime = parseInt(stopwatch.read()/1000);
  clearInterval(elaspedInterval);
  stopwatch.stop();
  return totalTime;
}

//make countdown timer in seconds if finish return false
function countdownTimer(seconds){
  var countdownInterval =  setInterval(function () {
        duration --;
        //console.log(duration);
        if(duration <= 0){
          clearInterval(countdownInterval);
        }
    }, 1000);
    return false;
}

//get current time in hr:min:sec format
function getCurrentTime(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

//return {floor,slot} of nearest free parking spot.
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

//return the user's cancel frequency
function cancelFrequency(username){
  var cancel = getUserCancel(username);
  return cancel;
}

//generate random unique id
function generateTokenID(){
  //npm install uuid
  const uuidv4 = require('uuid/v4');
  var tokenID = uuidv4();
  return tokenID;
}

function openFlap(spot){
//motor
}

function closeFlap(spot){
//motor
}

//check if qrcode value is equal to the id
function isQREqual(tokenID, qrcode){
  if(qrcode = tokenID){
    return true;
  }else{
    return false;
  }
}

function checkIn(platenumber,username, buildingname, floor, slot){
  var check = isQREqual(getReserveID(platenumber,username, buildingname, floor, slot),getReserveQRCodeIn(platenumber,username, buildingname, floor, slot));
  if(check == true){// && arriveTimeout == false && isParked(buildingname, floor, slot) == 0 && cancelFrequency(username) < 5
    stopwatch.start();
    setParkingSpotOccupied(buidlingname, floor, slot, 1);
  }
  //openFlap(reserve.getReserveID);
  //timer(30).start;
  //if(isParked){
  //  closeFlap(spot);
  //}
}

function cancel(username,buildingname,floor,slot){
  removeReserve(username, buidlingname, floor, slot);
  elaspedTimeStop();
  var cancel = getUserCancel(username);
  setUserCancel(username, cancel+1);
  setParkingSpotOccupied(buidlingname, floor, slot, 0);
}

//1 == sensor read car, 0 == sensor did not read car
function isParked(buildingname, floor, slot){
  //check sensor in that spot
  var value = getParkingSpotSensor(buildingname, floor, slot);
  return value;
}

// not used in real system prototype
function pay(transactionid){
//   link ebank somehow
   //setReservePaidStatus(username, buidlingname, floor, slot, haspaid);

}

function checkOut(platenumber,username, buidlingname, floor, slot){
  var check = isQREqual(getTransactionID(platenumber,username, buidlingname, floor, slot) == getReserveQRCodeOut(platenumber,username, buildingname, floor, slot));
  if(check == true){// && leftTimeout == false && isParked(buildingname, floor, slot) == 0
    var totaltime = elaspedTimeStop();
    setParkingSpotOccupied(buidlingname, floor, slot, 0);
    var parkingFee = Math.ceil(totaltime/3600) * 15;
    var transactionid = generateTokenID();
    var paymentmethod = 'Kbank';
    Transaction(platenumber,username, buidlingname, floor, slot,transactionid,parkingFee,paymentmethod,totaltime)
  }
}

//check from sensor and qrcodetimeout if the user has left the building
function hasLeft(buildingname,floor,slot){
  if(isParked(buildingname,floor,slot) == 1){// && leftTimeout == true
    setParkingSpotOccupied(buidlingname, floor, slot, 1);
    closeFlap(spot);
    stopwatch.start();
  }
}

//call in front end dee kwa
function makeReceipt(transactionID){
  var usernam = getTransactionUsername(transactionid, username);
  var transactionid = getTransactionID(transactionid, username);
  var parkingfee = getTransactionFee(transactionid, username);
  var paymentmethod = getTransactionPaymentMethod(transactionid, username);
}
