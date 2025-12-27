const board = document.querySelector(".board");
const blockWidth = 50;
const blockHeight = 50;
const startButton = document.querySelector(".start");
const restartButton = document.querySelector(".restart");
const startmodal = document.querySelector(".start");
const restartmodal = document.querySelector(".restart");
const modal = document.querySelector(".modal");
let intervalId = null;
const highscore = document.querySelector(".highscore");
const score = document.querySelector(".score");
const time = document.querySelector(".time");
let timeIntervalId = null;

let Score = 0;
let Highscore = localStorage.getItem("highscore") || 0;
let Time = `0-0`;

highscore.innerText = Highscore;
score.innerText = Score;
time.innerText = Time;

const columns = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let blocks = [];
let snake = [
  {
    x: 1,
    y: 2,
  },
];
let direction = "right";
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * columns),
};

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${i}-${j}`] = block;
  }
}

startButton.addEventListener("click", () => {
  modal.style.display = "none";
  intervalId = setInterval(() => {
    render();
  }, 300);
  timeIntervalId = setInterval(() => {
    let [minutes, seconds] = Time.split("-").map(Number);
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds = seconds + 1;
    }
    Time = `${minutes}-${seconds}`;
    time.innerText = Time;
  }, 1000);
});

restartButton.addEventListener("click", () => {
  Score = 0;
  score.innerText = Score;
  highscore.innerText = Highscore;
  Time = `0-0`;
  time.innerText = Time;

  snake.forEach((segment) => {
    if (blocks[`${segment.x}-${segment.y}`]) {
      blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    }
  });
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  modal.style.display = "none";
  snake = [
    {
      x: 1,
      y: 2,
    },
  ];
  timeIntervalId = setInterval(() => {
    let [minutes, seconds] = Time.split("-").map(Number);
    if (seconds >= 60) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds = seconds + 1;
    }
    Time = `${minutes}-${seconds}`;
    time.innerText = Time;
  }, 1000);
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * columns),
  };
  blocks[`${food.x}-${food.y}`].classList.add("food");
  intervalId = setInterval(() => {
    render();
  }, 200);
  direction = "right";
});

function render() {
  let head = null;
  if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns) {
    clearInterval(timeIntervalId);
    clearInterval(intervalId);

    modal.style.display = "flex";
    startmodal.style.display = "none";
    restartmodal.style.display = "flex";
    return;
  }
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
  blocks[`${food.x}-${food.y}`].classList.add("food");
  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * columns),
    };

    snake.unshift(head);
    Score += 10;
    score.innerText = Score;
    if (Score > Highscore) {
      Highscore = Score;
      highscore.innerText = Highscore;
      localStorage.setItem("highscore", Highscore);
    }
  }
}

addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    direction = "right";
  } else if (e.key === "ArrowLeft") {
    direction = "left";
  } else if (e.key === "ArrowDown") {
    direction = "down";
  } else if (e.key === "ArrowUp") {
    direction = "up";
  }
});
