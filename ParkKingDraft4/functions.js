//****************************************************Time related field*****************************************
//npm install statman-stopwatch
var Stopwatch = require('statman-stopwatch');
var stopwatch = new Stopwatch();
var elaspedInterval = 0;
var arriveTimeout = 0;
var leftTimeout = 0;
// startUserTimer();
// userCurrentTime();
// setTimeout(stopUserTimer,5000);

//How to start stopwatch for each reserveid or username?????????

//start user's timer
function startUserTimer(){
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
function stopUserTimer(){
  var totalTime = parseInt(stopwatch.read()/1000);
  clearInterval(elaspedInterval);
  stopwatch.stop();
  return totalTime;
}

//make countdown timer in seconds if finish return false
function countdownTimer(seconds){
  var timeout = false;
  var countdownInterval =  setInterval(function () {
        duration --;
        //console.log(duration);
        if(duration <= 0){
          clearInterval(countdownInterval);
          timeout = true;
        }
    }, 1000);
    return timeout;
}

//get current time in hr:min:sec format
function getCurrentTime(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}






//****************************************************ID Check field*****************************************
//generate random unique id (npm install uuid)
function generateTokenID(){
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

//click reserve, generate reserve
function reserveSpot(platenumber,username,buildingname,floor,slot){
  if(getUserReservable(username) == 1 && (getParkingSpotOccupied(buildingname, floor, slot) == 0 || getParkingSpotSensor(buildingname, floor, slot) == 0)){
    var reserveid = generateTokenID();
    Reserve(null,null,null,null,reserveid,0,platenumber, username,buildingname,floor,slot);
    setUserReservable(username,0);
    setParkingSpotOccupied(buidlingname, floor, slot, 1);
    arriveTimeout = countdownTimer(60*30);
  }
}

//scan qrcode and start timer
function checkIn(platenumber,username, buildingname, floor, slot){
  var check = isQREqual(getReserveID(platenumber,username, buildingname, floor, slot),getReserveQRCodeIn(platenumber,username, buildingname, floor, slot));
  if(check == true && arriveTimeout == false){
    startUserTimer(reserveID);
  }else{
    removeReserve(username, buidlingname, floor, slot);
    setParkingSpotOccupied(buidlingname, floor, slot, 0);
    setUserReservable(username,1);
  }
  //openFlap(reserve.getReserveID);
  //timer(30).start;
  //if(isParked){
  //  closeFlap(spot);
  //}
}

//click cancel button, delete reserve
function cancel(username,buildingname,floor,slot){
  if(arriveTimeout == false){
    removeReserve(username, buidlingname, floor, slot);
    var cancel = getUserCancel(username);
    setUserCancel(username, cancel+1);
    setParkingSpotOccupied(buidlingname, floor, slot, 0);
    setUserReservable(username,1);
    if(cancel >= 5){
      setUserReservable(username,0);
    }
  }
}

//click pay button ,stop time ,generate transaction
function pay(platenumber,username, buidlingname, floor, slot){
  var totaltime = stopuserTimer(reserveID);
  var parkingFee = Math.ceil(totaltime/3600) * 15;
  var transactionid = generateTokenID();
  var paymentmethod = 'Kbank';
  Transaction(platenumber,username, buidlingname, floor, slot,transactionid,parkingFee,paymentmethod,totaltime);
  leftTimeout = countdownTimer(60*15);
}

//scan qrcode and check car
function checkOut(platenumber,username, buidlingname, floor, slot){
  var check = isQREqual(getTransactionID(platenumber,username, buidlingname, floor, slot) == getReserveQRCodeOut(platenumber,username, buildingname, floor, slot));
  if(check == true && (getParkingSpotOccupied(buildingname, floor, slot) == 0 || getParkingSpotSensor(buildingname, floor, slot) == 0) && leftTimeout == false){
    setParkingSpotOccupied(buidlingname, floor, slot, 0);
    setUserReservable(username,1);
  }else{
    setParkingSpotOccupied(buidlingname, floor, slot, 1);
    setUserReservable(username,0);
    StartUserTimer(reserveID);
  }
}


//call in front end dee kwa
// function makeReceipt(transactionID){
//   var usernam = getTransactionUsername(transactionid, username);
//   var transactionid = getTransactionID(transactionid, username);
//   var parkingfee = getTransactionFee(transactionid, username);
//   var paymentmethod = getTransactionPaymentMethod(transactionid, username);
// }
