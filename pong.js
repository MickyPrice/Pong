let ball = {
  x: 295,
  y: 195,
  speed: 4,
  directionX: 1,
  directionY: 1
};

let leftPaddle = {
  x: 0,
  y: 170,
  speed: 8
};

let rightPaddle = {
  x: 590,
  y: 170
};

let score = {
  left: 0,
  right: 0
};

let gameBoard = document.getElementById("game-board");
let ballElem = document.getElementById("ball");
let leftPaddleElem = document.getElementById("paddle-left");
let rightPaddleElem = document.getElementById("paddle-right");

function moveBall() {
  ball.x += ball.speed * ball.directionX;
  ball.y += ball.speed * ball.directionY;

  // Check for collision with top and bottom walls
  if (ball.y > gameBoard.clientHeight - 10 || ball.y < 0) {
    ball.directionY *= -1;
  }

  // Check if the ball collides with LEFT paddle
  if (
    ball.x > leftPaddle.x - 10 &&
    ball.x < leftPaddle.x + 10 &&
    ball.y > leftPaddle.y - 50 &&
    ball.y < leftPaddle.y + 50
  ) {
    ball.directionX = 1;
  }

  // Check if the ball collides with RIGHT paddle
  if (
    ball.x > rightPaddle.x - 10 &&
    ball.x < rightPaddle.x + 10 &&
    ball.y > rightPaddle.y - 50 &&
    ball.y < rightPaddle.y + 50
  ) {
    ball.directionX = -1;
  }


  // Check for collision with left wall
  if (ball.x < 4) {
    ball.directionX = 1;
    // Random
    ball.directionY = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
    ball.x = 295; 
    // random
    ball.y = Math.floor(Math.random() * 195);
    leftPaddle.speed = Math.floor(Math.random() * 2) === 0 ? 7 : 8;
    score.left++;
    document.getElementById('left-score').innerHTML = score.left;
  }

  // Check for collision with right wall
  if (ball.x > gameBoard.clientWidth - 10) {
    ball.directionX = -1;
    // Random
    ball.directionY =  Math.floor(Math.random() * 2) === 0 ? 1 : -1;
    ball.x = 295;
    ball.y = Math.floor(Math.random() * 195);
    leftPaddle.speed =  Math.floor(Math.random() * 2) === 0 ? 7 : 8;
    score.right++;
    document.getElementById('right-score').innerHTML = score.right;
  }

  // Move the ball
  ballElem.style.top = ball.y + "px";
  ballElem.style.left = ball.x + "px";
}

function movePaddles() {
  document.addEventListener("keydown", function(event) {
    if (event.code === "ArrowUp" && rightPaddle.y > 0) {
      rightPaddle.y -= 20;
      rightPaddleElem.style.top = rightPaddle.y + "px";
    }

    if (event.code === "ArrowDown" && rightPaddle.y < 340) {
      rightPaddle.y += 20;
      rightPaddleElem.style.top = rightPaddle.y + "px";
    }
  });

  setInterval(function() {
    // Simple AI for left paddle
    if (ball.directionX === -1 && leftPaddle.y > ball.y - 50) {
      leftPaddle.y -= leftPaddle.speed;
    }
    if (ball.directionX === -1 && leftPaddle.y < ball.y - 50) {
      leftPaddle.y += leftPaddle.speed;
    }
    leftPaddleElem.style.top = leftPaddle.y + "px";
  }, 50);
}

movePaddles();
setInterval(function() {
  moveBall();
}, 25);
