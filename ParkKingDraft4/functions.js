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
  
}

function getTime(){
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

function isQREqual(QRcode,tokenID){
  if(QRcode == tokenID){
    return true;
  }else{
    return false;
  }
}

function checkIn(reserveID){
  isQREqual(QRcode,getterSetter.getReserveID);
  //openFlap(reserve.getReserveID);
  timer(30).start;
  if(isParked){
    closeFlap(spot);
  }
}

function isParked(reserveID){
  //check sensor that slot
  return true;
}

function pay(fee){
  //link ebank somehow
  this.hasPaid=true;
}

function checkOut(reserveID){
  pay(calculateFee(reserveID));
  timer.stop;
  openFlap(spot);
}

function calculateFee(reserveID){
  var totaltime=getTotalParkedTime(reserveID);
  return totaltime*10;
}

function getTotalParkedTime(reserveID){
  //aow timer ma har duration
}

function hasLeft(reserveID){
  if(checkIfCarLeft(spot)){
    closeFlap(spot);
  }
  reserve.ParkingSpot.isFull=false;

}

function checkIfCarLeft(spot);{
  //du sensor
  return true
}

function makeReceipt(reserveID){

}
