import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('[data-start]')
startBtn.disabled = true
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0]
    if (selectedDate <= new Date()) {
        Notiflix.Notify.warning("Please choose a date in the future!")
        startBtn.disabled = true
    } else {
    startBtn.disabled = false
    }
}
}

flatpickr(dateTimePicker, options)

const timerDays = document.querySelector('[data-days]')
const timerHours = document.querySelector('[data-hours]')
const timerMinutes = document.querySelector('[data-minutes]')
const timerSeconds = document.querySelector('[data-seconds]')

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}

function updateTimer(days, hours, minutes, seconds) {
    timerDays.textContent = addLeadingZero(days)
    timerHours.textContent = addLeadingZero(hours)
    timerMinutes.textContent = addLeadingZero(minutes)
    timerSeconds.textContent = addLeadingZero(seconds)
}

function startTimer(targetDate) {
    const intervalId = setInterval(() => {
        const currentDate = new Date()
        const remainingTime = targetDate.getTime() - currentDate.getTime()

    if (remainingTime <= 0) {
        clearInterval(intervalId)
        updateTimer(0, 0, 0, 0)
        Notiflix.Notify.success('Time is over :)')
        return
    }
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}

startBtn.addEventListener("click", () => {
    const selectedDate = flatpickr.parseDate(
      dateTimePicker.value
    )
    if (!selectedDate) {
      Notiflix.Notify.warning("Please choose a valid date!");
      return;
    }
    
    startTimer(selectedDate);
    startBtn.disabled = true;
})

