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
      var intHours = 7 - time.getHours();
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

var timer = document.getElementById("timer");
var watch = new Stopwatch(timer);
var watchRunning= false;


document.getElementById("timerBut").addEventListener("click",function timerStart() {
//Initiate Timer
if(watchRunning==false){
watchRunning= true;;
watch.start();
}

else{
  watch.stop();
  watchRunning=false
}

} );



// circular timer under here
/*
 *  Countdown 360 - v0.1.9
 *  This is a simple attractive circular countdown timer that counts down a number of seconds. The style is configurable and callbacks are supported on completion.
 *  https://github.com/johnschult/jquery.countdown360
 *
 *  Made by John Schult
 *  Under MIT License
 */
// ;(function ($, window, document, undefined) {
//   var pluginName = "countdown360",
//     defaults = {
//       radius: 80,                    // radius of arc
//       strokeStyle: "#66f215",          // the color of the stroke
//       strokeWidth: undefined,          // the stroke width, dynamically calulated if omitted in options
//       fillStyle: "#000000",            // the fill color
//       fontColor: "#ffffff",            // the font color
//       fontFamily: "sans-serif",        // the font family
//       fontSize: undefined,             // the font size, dynamically calulated if omitted in options
//       fontWeight: 700,                 // the font weight
//       autostart: true,                 // start the countdown automatically
//       seconds: 3600,                     // the number of seconds to count down
//       label: ["minutes", "seconds"],    // the label to use or false if none
//       startOverAfterAdding: true,      // Start the timer over after time is added with addSeconds
//       smooth: true,                   // should the timer be smooth or stepping
//       onComplete: function () {}
//     };
//
//   function Plugin(element, options) {
//     this.element = element;
//     this.settings = $.extend({}, defaults, options);
//     if (!this.settings.fontSize) { this.settings.fontSize = this.settings.radius/1.2; }
//     if (!this.settings.strokeWidth) { this.settings.strokeWidth = this.settings.radius/4; }
//     this._defaults = defaults;
//     this._name = pluginName;
//     this._init();
//   }
//
//   Plugin.prototype = {
//     getTimeRemaining: function()
//     {
//
//       var timeRemaining = this._secondsLeft(this.getElapsedTime());
//       return timeRemaining;
//     },
//     getElapsedTime: function()
//     {
//       return  Math.round((new Date().getTime() - this.startedAt.getTime())/1000);
//     },
//     extendTimer: function (value) {
//       var seconds = parseInt(value),
//           secondsElapsed = Math.round((new Date().getTime() - this.startedAt.getTime())/1000);
//       if ((this._secondsLeft(secondsElapsed) + seconds) <= this.settings.seconds) {
//         this.startedAt.setSeconds(this.startedAt.getSeconds() + parseInt(value));
//       }
//     },
//
//     addSeconds: function (value) {
//       var secondsElapsed = Math.round((new Date().getTime() - this.startedAt.getTime())/1000);
//       if (this.settings.startOverAfterAdding) {
//           this.settings.seconds = this._secondsLeft(secondsElapsed) + parseInt(value);
//           this.start();
//         } else {
//           this.settings.seconds += parseInt(value);
//         }
//     },
//
//     start: function () {
//       this.startedAt = new Date();
//       this._drawCountdownShape(Math.PI*3.5, true);
//       this._drawCountdownLabel(0);
//       var timerInterval = 1000;
//       if (this.settings.smooth) {
//         timerInterval = 16;
//       }
//       this.interval = setInterval(jQuery.proxy(this._draw, this), timerInterval);
//     },
//
//     stop: function (cb) {
//       clearInterval(this.interval);
//       if (cb) { cb(); }
//     },
//
//     _init: function () {
//       this.settings.width = (this.settings.radius * 2) + (this.settings.strokeWidth * 2);
//       this.settings.height = this.settings.width;
//       this.settings.arcX = this.settings.radius + this.settings.strokeWidth;
//       this.settings.arcY = this.settings.arcX;
//       this._initPen(this._getCanvas());
//       if (this.settings.autostart) { this.start(); }
//     },
//
//     _getCanvas: function () {
//       var $canvas = $("<canvas id=\"countdown360_" + $(this.element).attr("id") + "\" width=\"" +
//                       this.settings.width + "\" height=\"" +
//                       this.settings.height + "\">" +
//                       "<span id=\"countdown-text\" role=\"status\" aria-live=\"assertive\"></span></canvas>");
//       $(this.element).prepend($canvas[0]);
//       return $canvas[0];
//     },
//
//     _initPen: function (canvas) {
//       this.pen              = canvas.getContext("2d");
//       this.pen.lineWidth    = this.settings.strokeWidth;
//       this.pen.strokeStyle  = this.settings.strokeStyle;
//       this.pen.fillStyle    = this.settings.fillStyle;
//       this.pen.textAlign    = "center";
//       this.pen.textBaseline = "middle";
//       this.ariaText = $(canvas).children("#countdown-text");
//       this._clearRect();
//     },
//
//     _clearRect: function () {
//       this.pen.clearRect(0, 0, this.settings.width, this.settings.height);
//     },
//
//     _secondsLeft: function(secondsElapsed) {
//       return this.settings.seconds - secondsElapsed;
//     },
//
//     _drawCountdownLabel: function (secondsElapsed) {
//       this.ariaText.text(secondsLeft);
//       this.pen.font         = this.settings.fontWeight + " " + this.settings.fontSize + "px " + this.settings.fontFamily;
//       var secondsLeft = this._secondsLeft(secondsElapsed),
//           label = secondsLeft === 1 ? this.settings.label[0] : this.settings.label[1],
//           drawLabel = this.settings.label && this.settings.label.length === 2,
//           x = this.settings.width/2;
//       if (drawLabel) {
//         y = this.settings.height/2 - (this.settings.fontSize/6.2);
//       } else {
//         y = this.settings.height/2;
//       }
//       this.pen.fillStyle = this.settings.fillStyle;
//       this.pen.fillText(secondsLeft + 1, x, y);
//       this.pen.fillStyle  = this.settings.fontColor;
//       this.pen.fillText(secondsLeft, x, y);
//       if (drawLabel) {
//         this.pen.font = "normal small-caps " + (this.settings.fontSize/3) + "px " + this.settings.fontFamily;
//         this.pen.fillText(label, this.settings.width/2, this.settings.height/2 + (this.settings.fontSize/2.2));
//       }
//     },
//
//     _drawCountdownShape: function (endAngle, drawStroke) {
//       this.pen.fillStyle = this.settings.fillStyle;
//       this.pen.beginPath();
//       this.pen.arc(this.settings.arcX, this.settings.arcY, this.settings.radius, Math.PI*1.5, endAngle, false);
//       this.pen.fill();
//       if (drawStroke) { this.pen.stroke(); }
//     },
//
//     _draw: function () {
//       var millisElapsed, secondsElapsed;
//       millisElapsed = new Date().getTime() - this.startedAt.getTime();
//       secondsElapsed = Math.floor((millisElapsed)/1000);
//         endAngle = (Math.PI*3.5) - (((Math.PI*2)/(this.settings.seconds * 1000)) * millisElapsed);
//       this._clearRect();
//       this._drawCountdownShape(Math.PI*3.5, false);
//       if (secondsElapsed < this.settings.seconds) {
//         this._drawCountdownShape(endAngle, true);
//         this._drawCountdownLabel(secondsElapsed);
//       } else {
//         this._drawCountdownLabel(this.settings.seconds);
//         this.stop();
//         this.settings.onComplete();
//       }
//     }
//
//   };
//
//   $.fn[pluginName] = function (options) {
//     var plugin;
//     this.each(function() {
//       plugin = $.data(this, "plugin_" + pluginName);
//       if (!plugin) {
//         plugin = new Plugin(this, options);
//         $.data(this, "plugin_" + pluginName, plugin);
//       }
//     });
//     return plugin;
//   };
//
// })(jQuery, window, document);
