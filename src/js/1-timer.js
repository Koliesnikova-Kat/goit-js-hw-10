import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

button.disabled = true;

let userSelectedDate;

let timer = new flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  },
});

button.addEventListener('click', startCountdown);

let intervalId = null;

function startCountdown() {
  button.disabled = true;
  input.disabled = true;

  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const countdown = userSelectedDate - currentDate;
    
    if (countdown <= 0) {
      clearInterval(intervalId);
      resetTimer();
      return;
    }
    
    const time = convertMs(countdown);
    updateTime(time);
  }, 1000);
}

function updateTime({ days, hours, minutes, seconds }) {
  daysDisplay.textContent = addLeadingZero(days);
  hoursDisplay.textContent = addLeadingZero(hours);
  minutesDisplay.textContent = addLeadingZero(minutes);
  secondsDisplay.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function resetTimer() {
  input.disabled = false;
  button.disabled = true;
}