var Stopwatch = require('statman-stopwatch');
var stopwatch = new Stopwatch();

stopwatch.start();

function elaspedTime() {
  var time = parseInt(stopwatch.read()/1000);
  var hours = ~~(time / 3600);
  var min = ~~((time % 3600) / 60);
  var sec = time % 60;
  console.log(hours+":"+min+":"+sec);
}
writeTime();
setInterval(writeTime,1000);


function Timer(seconds) {
  var myInterval =  setInterval(function () {
        duration --;
        //console.log(duration);
        if(duration < 1){
          clearInterval(myInterval);
        }
    }, 1000);
}
