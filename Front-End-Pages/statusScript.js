document.getElementById("checkOutBut").addEventListener("click", function() {
  window.location = 'receipt.html';
});

//Create Timer
function Stopwatch(elem) {
    var time = 0;
    var offset;
    var interval;

    function update() {
        time += delta();
        elem.textContent = timeFormatter(time);
    }

    function delta() {
      var now = Date.now();
      var timePassed = now - offset;

      offset = now;

      return timePassed;
    }

    function timeFormatter(time) {
      time = new Date(time);

      var minutes = time.getMinutes().toString();
      var seconds = time.getSeconds().toString();
      var intHours = time.getHours() - 7;
      var hours = intHours.toString();

      if (minutes.length < 2) {
        minutes = '0' + minutes;
      }

      if (seconds.length < 2) {
        seconds = '0' + seconds;
      }

      if (hours.length < 2) {
        hours = '0' + hours;
      }

      return hours + ' : ' + minutes + ' : ' + seconds;
    }

    this.start = function() {
      interval = setInterval(update.bind(this), 10);
      offset = Date.now();
    };

    this.stop = function() {
      clearInterval(interval);
      interval = null;
    };

    this.reset = function() {
      time = 0;
      update();
    };

}

//Initiate Timer
var timer = document.getElementById("timer");
var watch = new Stopwatch(timer);

watch.start();
