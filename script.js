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
    countdown.textContent = "🎉 Congrats! You're now 1 year older! 🎉 (haha, oldie)"

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

createBoxes(document.getElementById('days-box'), 2)
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

//MINIGAME
let count = 0
let state = 0
let isWatering = false
let cooldown = false

const raindropsContainer = document.getElementById('raindrops')
const countDisplay = document.getElementById('count')
const wateringCan = document.getElementById('wateringCan')
const canPlace = document.getElementById('canPlace')
const plant = document.getElementById('plant')

const canPosition = (() => {
  const rect = canPlace.getBoundingClientRect()
  return { top: (rect.top + window.scrollY) / 2, left: (rect.left + window.scrollX) / 2 }
})()

Object.assign(wateringCan.style, {
  top: `${canPosition.top}px`,
  left: `${canPosition.left}px`,
})

function updateCount(value) {
  count = value
  countDisplay.innerText = count
}

function createRaindrop() {
  if (count >= 7) return

  const raindrop = document.createElement('div')
  raindrop.className = 'raindrop'
  raindrop.innerText = '💧'
  Object.assign(raindrop.style, {
    left: `${Math.random() * window.innerWidth}px`,
    top: '0px',
  })

  raindropsContainer.appendChild(raindrop)

  const fallInterval = setInterval(function () {
    const top = parseFloat(raindrop.style.top)
    if (top < window.innerHeight) {
      raindrop.style.top = `${top + 2}px`
    } else {
      clearInterval(fallInterval)
      raindrop.remove()
    }
  }, 20)

  raindrop.addEventListener('click', function () {
    updateCount(count + 1)
    raindrop.remove()
    clearInterval(fallInterval)
  })
}

setInterval(createRaindrop, 1000)

function updateWateringCanMirror() {
  const plantRect = plant.getBoundingClientRect()
  const canRect = wateringCan.getBoundingClientRect()

  if (wateringCan.classList.contains('watering')) {
    wateringCan.style.transform = 'rotate(-45deg)'
  } else {
    wateringCan.style.transform = canRect.left + canRect.width / 2 < plantRect.left + plantRect.width / 2 ? 'scaleX(-1)' : 'scaleX(1)'
  }
}

function startWatering() {
  if (isWatering || cooldown || state >= 6 || count < 1) return

  updateCount(count - 1)
  isWatering = true
  wateringCan.classList.add('watering')
  plant.classList.add('watered')

  setTimeout(function () {
    plant.classList.remove('watered')
    wateringCan.classList.remove('watering')
    isWatering = false

    state++
    plant.src = `assets/plant/${state}.png`

    cooldown = true
    setTimeout(function () {
      cooldown = false
    }, 2000)
  }, 2000)
}

function onMouseMove(e, offsetX, offsetY) {
  canPosition.left = e.clientX - offsetX
  canPosition.top = e.clientY - offsetY

  Object.assign(wateringCan.style, {
    left: `${canPosition.left}px`,
    top: `${canPosition.top}px`,
  })

  updateWateringCanMirror()

  const plantRect = plant.getBoundingClientRect()
  const canRect = wateringCan.getBoundingClientRect()

  if (
    canRect.left < plantRect.right &&
    canRect.right > plantRect.left &&
    canRect.top < plantRect.bottom &&
    canRect.bottom > plantRect.top
  ) {
    startWatering()
  }
}

wateringCan.addEventListener('mousedown', function (e) {
  const offsetX = e.clientX - canPosition.left
  const offsetY = e.clientY - canPosition.top

  function moveHandler(moveEvent) {
    onMouseMove(moveEvent, offsetX, offsetY)
  }

  function upHandler() {
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('mouseup', upHandler)
})
