import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
require("flatpickr/dist/themes/dark.css");

const startBtn = document.querySelector('button[data-start]')
const dateTimePicker = document.querySelector('#datetime-picker')

function convertMs(ms) {
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    const days = Math.floor(ms / day)
    const hours = Math.floor((ms % day) / hour) 
    const minutes = Math.floor(((ms % day) % hour) / minute)  
    const seconds = Math.floor((((ms % day) % hour) % minute) / second)
  
    return { days, hours, minutes, seconds }
  }

    let targetTime = null
    let intervalTime = null

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0]
    if (selectedDate < new Date()) {
      Notify.failure('Please choose a date in the future!')
      startBtn.disabled = true
    } else {
        startBtn.disabled = false
        targetTime = selectedDate.getTime()
    }
  },
};

flatpickr(dateTimePicker, options)

function addLeadingZero(value) {
    return value.toString().padStart(2, '0')
}

function updTimeToNew() {
  const currentDate = new Date()
  const difference = targetTime - currentDate
  const convertedDifference = convertMs(difference)
  if (difference < 0) {
    clearInterval(intervalTime)
    Notify.success('Time is over! ;)')
    startBtn.disabled = false
    dateTimePicker.disabled = false
    return;
  }

  for (const num in convertedDifference) {
    const numValue = convertedDifference[num]
    document.querySelector(`[data-${num}]`).textContent = addLeadingZero(numValue)
  }
}

const StartBtnClick = evt => {
  intervalTime = setInterval(updTimeToNew, 1000)
  startBtn.disabled = true;
  dateTimePicker.disabled = true;
};

startBtn.addEventListener('click', StartBtnClick)