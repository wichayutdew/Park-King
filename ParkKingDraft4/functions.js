function checkAvailabiliy(){
  //
}

function cancelFrequency(){

}

function timer(){

}

function generateReserveID(){

  return reserveID;
}

function generateQR(){

}

function openFlap(spot){
//motor
}

function closeFlap(spot){
//motor
}

function isQREqual(qr1,qr2){

}

function checkIn(reserveID){
  isQREqual(reserve.getReserveID, qr2);
  openFlap(reserve.getReserveID);
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
  this.hasPaid=true
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
