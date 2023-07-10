import { Notify } from 'notiflix/build/notiflix-notify-aio'

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
}
const formEl = document.querySelector('.form')

formEl.addEventListener('submit', formElSubmit)

function formElSubmit(evt) {
  evt.preventDefault()
  let { amount, delay, step } = evt.target.elements
  amount = Number.parseInt(amount.value)
  delay = Number.parseInt(delay.value)
  step = Number.parseInt(step.value)

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + step * i)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      })
  }
}