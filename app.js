const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const btns = timeList.querySelectorAll('.time-btn')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0
const colors = ['#0ee6dc', '#45d90b', '#e4dc0c', '#ff9300', '#ffffff']

startBtn.addEventListener('click', event => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = +event.target.dataset.time
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


for (let i = 0; i < btns.length; i++) {
    btns[i].setAttribute('data-time', `${10 * (i + 1)}`)
}

function startGame() {
    createRandomCircle()
    setInterval(decreaseTime, 1000)
    setTime(time)
}

function decreaseTime() {

    if (time === 0 ) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
    timeEl.parentNode.classList.add('hide')
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)

    const { width, height } = board.getBoundingClientRect()

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)


    circle.classList.add('circle')
    circle.style.height = `${size}px`
    circle.style.width = `${size}px`

    circle.style.top = `${y}px`
    circle.style.left =`${x}px`

    circle.style.background = getRandomColor()
    circle.style.boxShadow = `0 0 2px ${circle.style.background}, 0 0 10px ${circle.style.background}`

            board.append(circle)
}

function getRandomNumber(min, max) {
     return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}
