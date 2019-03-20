var Stopwatch = require('statman-stopwatch');
var stopwatch = new Stopwatch();
stopwatch.start();
var x = setInterval(write,1000);

function write() {
  var input = parseInt(stopwatch.read()/1000);
  var hr;
  var min;
  var sec;
  if(input >= 3600){
    if(input >= 60){
      min += 1;
      sec = 0;
    }
    hr += 1;
    min = 0;
  }
  console.log(hr+":"+min+":"+sec);
}
