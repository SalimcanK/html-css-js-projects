const daysUI = document.getElementById('days');
const hoursUI = document.getElementById('hours');
const minutesUI = document.getElementById('minutes');
const secondsUI = document.getElementById('seconds');
const countdownUI = document.getElementById('countdown');
const yearUI = document.getElementById('year');
const loadingUI = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// set countdown year
yearUI.innerText = currentYear + 1;

function updateCountdown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    // % used because we need to account for the time already passed
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) %60;
    const seconds = Math.floor(diff / 1000) % 60;

    daysUI.innerHTML = days;
    hoursUI.innerHTML = hours < 10 ? '0' + hours : hours; // add 0 in front of the number if it is less than 10
    minutesUI.innerHTML = minutes < 10 ? '0' + minutes : minutes;
    secondsUI.innerHTML = seconds < 10 ? '0' + seconds : seconds;
}

// show spinner
setTimeout(() => {
    loadingUI.remove();
    countdownUI.style.display = 'flex';
}, 1000);

// run every second
setInterval(updateCountdown, 1000);