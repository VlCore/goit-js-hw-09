function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
let intervalId = null 

startBtn.addEventListener('click', (event) => {
    if (!intervalId) {
        event.target.disabled = true;
        intervalId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    }
});

stopBtn.addEventListener('click', (event) => {
    clearInterval(intervalId);
    intervalId = null;
    event.target.disabled = false;
    startBtn.disabled = false;
});