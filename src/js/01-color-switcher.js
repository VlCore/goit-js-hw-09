function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
let intervalId = null 

startBtn.addEventListener('click', (event) => {
    const targetBtn = event.target;
    if (!intervalId) {
        targetBtn.disabled = true;
        intervalId = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    }
});

stopBtn.addEventListener('click', (event) => {
    const targetBtn = event.target;
    clearInterval(intervalId);
    intervalId = null;
    targetBtn.disabled = false;
});