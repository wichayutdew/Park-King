const countDownClock = (number = 100, format = 'seconds') => {

  const d = document;
  // const daysElement = d.querySelector('.days');
  const hoursElement = d.querySelector('.hours');
  const minutesElement = d.querySelector('.minutes');
  // const secondsElement = d.querySelector('.seconds');
  let countdown;
  convertFormat(format);


  function convertFormat(format) {
    switch(format) {
      case 'seconds':
        return timer(number);
      case 'minutes':
        return timer(number * 60);
        case 'hours':
        return timer(number * 60 * 60);
      case 'days':
        return timer(number * 60 * 60 * 24);
    }
  }

  function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    countdown = setInterval(() => {
      const secondsLeft = Math.round((then - Date.now()) / 1000);

      if(secondsLeft <= 0) {
        clearInterval(countdown);
        return;
      };

      displayTimeLeft(secondsLeft);

    },1000);
  }

  function displayTimeLeft(seconds) {
    // daysElement.textContent = Math.floor(seconds / 86400);
    hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
    minutesElement.textContent = Math.floor((seconds % 86400) % 3600 / 60);
    // secondsElement.textContent = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
  }
}


function startTimer(){
  console.log('clicked');
  countDownClock(30, 'minutes');
}

/*
  start countdown
  enter number and format
  days, hours, minutes or seconds
*/

// countDownClock(30, 'minutes');


//get Time from the node Server
function getTimeandFee(){
  $.get('/getTimeandFee')
  .done(function(data){
    const hoursElement = document.querySelector('.hours');
    const minutesElement = document.querySelector('.minutes');
    const currentFee = document.querySelector('#currentFee');
    // console.log(data.totaltime);
    // console.log(data.parkingFee);
    hoursElement.textContent = data.hours;
    minutesElement.textContent = data.mins;
    currentFee.textContent = data.parkingFee + ' Baht';
  })
  .fail(function(){
    console.log('err');
  });
}


//call getTimeandFee every 0.5s

var getTimeandFeeIntervalID = setInterval(getTimeandFee, 500);
