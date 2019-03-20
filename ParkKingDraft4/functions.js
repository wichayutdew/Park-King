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
  var cancel = getterSetter.getUserCancel(username);
  return cancel;
}

function timer(time){
  //tum pen class dee kwa
}

function getCurrentTime(){
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
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

function checkIn(username,building,floor,slot){
  var check = isQREqual(getterSetter.getReserveID(username,building,floor,slot), getterSetter.getReserveQRCodeIn(username,building,floor,slot));
  if(check == true){// && timeout == false
    stopwatch.start();
  }
  //openFlap(reserve.getReserveID);
  //timer(30).start;
  //if(isParked){
  //  closeFlap(spot);
  //}
}

function isParked(reserveID){
  //check sensor that slot
  return true;
}

// not use in real system prototype
// function pay(fee){
//   //link ebank somehow
//   this.hasPaid=true;
// }

function checkOut(username,builging,floor,slot,transactionid){
  var check = isQREqual(getterSetter.getTransactionID(transactionid,username) == getterSetter.getReserveQRCodeOut(username,builging,floor,slot));
  if(check == true){// && timeout == false && isParked == false
    var totaltime = elaspedTimeStop();
  }
  var parkingFee = Math.ceil(totaltime/3600) * 15;
  openFlap(spot);
}

function calculateFee(reserveID){
  var totaltime = getTotalParkedTime(reserveID);
  return totaltime*10;
}

function hasLeft(reserveID){
  if(checkIfCarLeft(spot)){
    closeFlap(spot);
  }
  reserve.ParkingSpot.isFull=false;
}

function checkIfCarLeft(spot){
  //du sensor
  return true
}

function makeReceipt(reserveID){

}
