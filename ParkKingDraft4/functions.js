//****************************************************Time related field*****************************************
//npm install statman-stopwatch
var Stopwatch = require('statman-stopwatch');
var stopwatch = new Stopwatch();
var elaspedInterval = 0;
var arriveTimeout = 0;
var leftTimeout = 0;




//start user's timer
exports.startUserTimer = function(){
  stopwatch.start();
}

//show elasped time
function userCurrentTime() {
  elaspedInterval = setInterval(function() {
    var time = parseInt(stopwatch.read()/1000);
    var hours = ~~(time / 3600);
    var min = ~~((time % 3600) / 60);
    var sec = time % 60;
    console.log(hours+":"+min+":"+sec);
  },1000);
}

//stop the stopwatch
exports.stopUserTimer = function(){
  var totalTime = parseInt(stopwatch.read()/60000);
  clearInterval(elaspedInterval);
  stopwatch.stop();
  return totalTime;
}

//get current time in hr:min:sec format
exports.getCurrentDate = function(){
  var today = new Date();
  var date = today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();
  return date;
}
exports.getCurrentTime = function(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}


//****************************************************ID Check field*****************************************
//generate random unique id (npm install uuid)
exports.generateTokenID = function(){
  const uuidv4 = require('uuid/v4');
  var tokenID = uuidv4();
  return tokenID;
}

//check if qrcode value is equal to the id
function isQREqual(tokenID, qrcode){
  if(qrcode = tokenID){
    return true;
  }else{
    return false;
  }
}







//****************************************************Parking flap field*****************************************
function openFlap(spot){
//motor
}

function closeFlap(spot){
//motor
}







//****************************************************Reserve, cancel, and  checkout field*****************************************
//scan qrcode and start timer
function checkIn(platenumber, username, floor, slot, buildingname){
  var check = isQREqual(getReserveID(platenumber, username, floor, slot, buildingname),getReserveQRCodeIn(platenumber, username, floor, slot, buildingname));
  if(check == true && arriveTimeout == false){
    setReserveTimeIn(platenumber,username, floor, slot, buidlingname, getCurrentTime());
    startUserTimer();
  }
}

//click pay button ,stop time ,generate transaction
function pay(platenumber,username, floor, slot, buidlingname){
  var totaltime = stopuserTimer();
  setReserveTimeOut(platenumber,username, floor, slot, buidlingname, getCurrentTime());
  var parkingFee = Math.ceil(totaltime/3600) * 15;
  var transactionid = generateTokenID();
  var paymentmethod = 'Kbank';
  Transaction(platenumber,username, floor, slot, buidlingname, transactionid, parkingFee, paymentmethod, totaltime);
  setReservePaidStatus(platenumber,username, floor, slot, buidlingname, 1);
  leftTimeout = countdownTimer(60*15);
}

//scan qrcode and check car
function checkOut(platenumber,username, floor, slot, buidlingname){
  var check = isQREqual(getTransactionID(platenumber, username, floor, slot, buidlingname) == getReserveQRCodeOut(platenumber, username, floor, slot, buildingname));
  if(check == true && (getParkingSpotOccupied(floor, slot, buildingname) == 0 || getParkingSpotSensor(floor, slot, buildingname) == 0) && leftTimeout == false){
    setParkingSpotOccupied(floor, slot, buidlingname, 0);
    setUserReservable(username,1);
  }
}
