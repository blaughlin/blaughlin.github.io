const startButton = document.getElementById("startButton")
const grid = document.querySelector(".grid")
scoreText = document.getElementById('score')
let snake = [2,1,0]
let squares = []
let direction = 1
intervalTime = 1000
const width = 10
let score = 0
let timerId = 0
const hitWall = new Audio('Hit_Hurt21.wav')
const powerUp = new Audio('powerup.wav')
const blip = new Audio('Blip.wav')
const moveSound = new Audio('move.wav')
let appleIndex = 0

startButton.addEventListener('click', startGame)

function createGrid(){
    for (let i = 0; i < 100; i++){
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)

    }
}
createGrid()

function createSnake() {
    snake = [2,1,0]
    snake.forEach( (e) => squares[e].classList.add('snake'))
    squares[snake[0]].classList.add('snakeHead')
}

function removeSnake() {
    snake.forEach( (e) => squares[e].classList.remove('snake'))
    squares[snake[0]].classList.remove('snakeHead')
}

function startGame(){
    blip.play()
    startButton.textContent="Reset Game"

    removeSnake()
    //snake.forEach(index => squares[index].classList.remove("snake"))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    score = 0
    scoreText.textContent = score
    direction = 1
    createSnake()
    addApple()
    intervalTime = 1000
    timerId = setInterval(move, intervalTime) 
}


function move() {
    if (snake[0] % width === width-1 && direction === 1 ||
        snake[0] % width === 0 && direction === -1 ||
        snake[0] + width >= width*width && direction === 10 ||
        snake[0] - width < 0 && direction === -10 ||
        squares[snake[0] + direction ].classList.contains('snake')) {
            hitWall.play()
            startButton.textContent="Start Game"
            return clearInterval(timerId)
    }
    squares[snake[0]].classList.remove('snakeHead')
    let tail = snake.pop()
    snake.unshift(snake[0]+ direction)
    squares[tail].classList.remove('snake')
    snake.forEach( (e) => squares[e].classList.add('snake'))
    scoreText.textContent = score

    if (squares[snake[0]].classList.contains('apple')){
    score ++
    squares[snake[0]].classList.remove('apple')
    powerUp.play()
    addApple()
    //grow snake
    snake.push(tail)
    // speed up game
    clearInterval(timerId)
    intervalTime = intervalTime * 0.8
    timerId = setInterval(move, intervalTime)
    }
    squares[snake[0]].classList.add('snakeHead')

}

function addApple () {
    do {
        appleIndex = Math.floor(Math.random() * width*width)
    } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')



}


window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      moveSound.play()
      direction = 10
      break;
    case "ArrowUp":
        moveSound.play()
        direction = -10
      break;
    case "ArrowLeft":
        moveSound.play()
        direction = -1
      break;
    case "ArrowRight":
        moveSound.play()
        direction = 1
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);
