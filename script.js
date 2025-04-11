//PARTICLES
particlesJS('particles-js', {
  particles: {
    number: { value: 20 },
    shape: {
      type: 'image',
      image: {
        src: 'https://pngimg.com/uploads/autumn_leaves/autumn_leaves_PNG3603.png',
        width: 50,
        height: 50,
      },
    },
    move: {
      direction: 'bottom',
      out_mode: 'out',
      speed: 2,
    },
    opacity: { value: 0.1 },
  },
})

//COUNTDOWN
function createBoxes(container, numDigits) {
  container.innerHTML = ''
  for (let i = 0; i < numDigits; i++) {
    let span = document.createElement('span')
    span.classList.add('digit')
    span.innerText = '0'
    container.appendChild(span)
  }
}

function updateBoxes(container, value) {
  const digits = container.querySelectorAll('.digit')
  const strValue = value.toString().padStart(digits.length, '0')

  digits.forEach((digit, index) => {
    if (digit.innerText !== strValue[index]) {
      digit.innerText = strValue[index]
      digit.style.transform = 'scale(1.1)'
      setTimeout(() => (digit.style.transform = 'scale(1)'), 150)
    }
  })
}

function updateCountdown() {
  const targetDate = new Date('August 11, 2025 00:00:00').getTime()
  const now = new Date().getTime()
  const timeLeft = targetDate - now

  if (timeLeft <= 0) {
    const countdown = document.getElementById('countdown')
    countdown.style.fontFamily = "'Comic Sans MS', cursive"
    countdown.textContent = "🎉 You're officially an oldie now! 🎉"

    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 },
    })

    const label = document.getElementById('label')
    label.textContent = 'Happy Birthday!!'

    let titleColor = 0
    function changeTitleColor() {
      label.style.color = `hsl(${titleColor}, 80%, 55%)`
      titleColor++
    }

    let intervalId = null
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
      titleColor = 0
      label.style.color = colorLight
    } else {
      intervalId = setInterval(changeTitleColor, 25)
    }
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  updateBoxes(document.getElementById('days-box'), days)
  updateBoxes(document.getElementById('hours-box'), hours)
  updateBoxes(document.getElementById('minutes-box'), minutes)
  updateBoxes(document.getElementById('seconds-box'), seconds)

  setTimeout(updateCountdown, 1000)
}

createBoxes(document.getElementById('days-box'), 3)
createBoxes(document.getElementById('hours-box'), 2)
createBoxes(document.getElementById('minutes-box'), 2)
createBoxes(document.getElementById('seconds-box'), 2)

updateCountdown()

//CREDITS
const credits = document.getElementById('credits')
let titleColor = 0
function changeTitleColor() {
  credits.style.color = `hsl(${titleColor}, 80%, 55%)`
  titleColor++
}

let intervalId = null
if (intervalId) {
  clearInterval(intervalId)
  intervalId = null
  titleColor = 0
  credits.style.color = colorLight
} else {
  intervalId = setInterval(changeTitleColor, 25)
}
