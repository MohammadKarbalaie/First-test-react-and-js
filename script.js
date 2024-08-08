let timeInput = document.getElementById('time-input');  
let timeOptions = document.getElementById('timeOptions');
let startStopBtn = document.getElementById('start-stop-btn');  
let resetBtn = document.getElementById('reset-btn');  
let musicBtn = document.getElementById('music-btn');  
let playPauseBtn = document.getElementById('play-pause-btn');  
let countdownDisplay = document.getElementById('countdown-display');  
let timerId = null;  
let hours = 0;  
let minutes = 0;  
let seconds = 0;  
let isRunning = false;  
let isPlaying = false;  
let audio = new Audio('Ring.mp3');  
 
timeOptions.addEventListener('change', () => {  
    if (timeOptions.value === 'custom') {  
     timeInput.style.display = 'block';  
    } else {  
     timeInput.style.display = 'none';  
     hours = parseInt(timeOptions.value / 3600);  
     minutes = parseInt((timeOptions.value % 3600) / 60);  
     seconds = timeOptions.value % 60;  
    }  
  });

function startTimer() {  
  return new Promise((resolve, reject) => {  
   isRunning = true;  
   startStopBtn.textContent = 'Stop';  
   timerId = setInterval(() => {  
    seconds--;  
    if (seconds < 0) {  
      minutes--;  
      seconds = 59;  
    }  
    if (minutes < 0) {  
      hours--;  
      minutes = 59;  
    }  
    if (hours < 0) {  
      hours = 0;  
      minutes = 0;  
      seconds = 0;  
      stopTimer();  
      playSound();  
      resolve();  
    }  
    updateDisplay();  
   }, 1000);  
  });  
}  
  
function stopTimer() {  
  return new Promise((resolve, reject) => {  
   isRunning = false;  
   startStopBtn.textContent = 'Start';  
   clearInterval(timerId);  
   resolve();  
  });  
}  
  
function updateDisplay() {  
  return new Promise((resolve, reject) => {  
   let timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;  
   countdownDisplay.textContent = timeString;  
   if (hours <= 0 && minutes <= 0 && seconds <= 10) {  
    countdownDisplay.classList.add('urgent');  
   } else {  
    countdownDisplay.classList.remove('urgent');  
   }  
   if (isRunning) {  
    countdownDisplay.classList.add('running');  
   } else {  
    countdownDisplay.classList.remove('running');  
   }  
   let circle = document.getElementById('countdown-display');  
   let progress = (30 - seconds) / 30;  
   circle.style.background = `conic-gradient(red ${progress * 360}deg, green 0deg)`;  
   if (seconds <= 10) {  
    circle.style.background = 'conic-gradient(red 360deg, red 0deg)';  
   }  
   resolve();  
  });  
}  
  
function pad(number) {  
  return (number < 10? '0' : '') + number;  
}  
  
function playSound() {  
  return new Promise((resolve, reject) => {  
   if (!isPlaying) {  
    audio.loop = true;  
    audio.play();  
    isPlaying = true;  
    playPauseBtn.textContent = 'Pause';  
   } else {  
    audio.pause();  
    isPlaying = false;  
    playPauseBtn.textContent = 'Play';  
   }  
   resolve();  
  });  
}  
  
startStopBtn.addEventListener('click', () => {  
  if (!isRunning) {  
   if (hours === 0 && minutes === 0 && seconds === 0) {  
    hours = parseInt(timeInput.value / 3600);  
    minutes = parseInt((timeInput.value % 3600) / 60);  
    seconds = timeInput.value % 60;  
   }  
   startTimer().then(() => {  
    console.log('Timer started');  
   });  
  } else {  
   stopTimer().then(() => {  
    console.log('Timer stopped');  
   });  
  }  
});  
  
resetBtn.addEventListener('click', () => {  
  stopTimer().then(() => {  
   hours = 0;  
   minutes = 0;  
   seconds = 0;  
   countdownDisplay.textContent = '00:00:00';  
   countdownDisplay.classList.remove('running', 'urgent');  
   audio.pause();  
   audio.currentTime = 0;  
   isPlaying = false;  
   playPauseBtn.textContent = 'Play';  
  });  
});  
  
playPauseBtn.addEventListener('click', () => {  
  playSound().then(() => {  
   console.log('Sound played/paused');  
  });  
});  
  
musicBtn.addEventListener('click', () => {  
  // Add music playback functionality here  
  console.log('Music playback not implemented');  
});
