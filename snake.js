const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

const FIELD_HEIGHT = 500;
const FIELD_WIDTH = 500;
const ITEM_SIZE = 25;

let direction = 1;
const snakeBody = [{x: 0, y: 0}, {x: 25, y: 0}, {x: 50, y: 0}];
let isAte = false;
const directions = {
  1: ITEM_SIZE,
  2: ITEM_SIZE,
  3: -ITEM_SIZE,
  4: -ITEM_SIZE,
};

const random = (min, max) => Math.floor(Math.random() * (max - min), + min);

const genApple = () => ({x: random(0, FIELD_HEIGHT - ITEM_SIZE), y: random(0, FIELD_WIDTH - ITEM_SIZE)});

const validateAppleCoords = () => {
  if (apple.x % ITEM_SIZE != 0) {
    const curX = apple.x; 
    apple.x = curX + (ITEM_SIZE - (curX % ITEM_SIZE));
    if (apple.x + ITEM_SIZE > FIELD_WIDTH) apple.x -= ITEM_SIZE;
    if (apple.x - ITEM_SIZE < 0) apple.x += ITEM_SIZE;
  }
  if (apple.y % ITEM_SIZE != 0) {
    const curY = apple.y;
    apple.y = curY + (ITEM_SIZE - (curY % ITEM_SIZE));
    if (apple.y + ITEM_SIZE > FIELD_HEIGHT) apple.y -= ITEM_SIZE;
    if (apple.y - ITEM_SIZE < 0) apple.y += ITEM_SIZE;
  }
}

const validateSnakeCoords = item => {
  if (item.x >= FIELD_WIDTH) item.x = 0;
  if (item.y >= FIELD_HEIGHT) item.y = 0;
  if (item.x < 0) item.x = FIELD_WIDTH;
  if (item.y < 0) item.y = FIELD_HEIGHT;
}

let apple = genApple();
validateAppleCoords();

const runGame = () => {
  const refreshFrame = setInterval(() => {
    const firstX = snakeBody[0].x;
    const firstY = snakeBody[0].y;
    let lastX = snakeBody[snakeBody.length - 1].x;
    let lastY = snakeBody[snakeBody.length - 1].y;
    if (isAte) {
      apple = genApple();
      validateAppleCoords();
      let newX = firstX;
      let newY = firstY;
      (direction % 2 == 0) ? newY += directions[direction] : newX += directions[direction];
      snakeBody.unshift({x: newX, y: newY});
      isAte = false;
    }
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, ITEM_SIZE, ITEM_SIZE);
    ctx.fillStyle = 'green';
    
    if (direction % 2 == 0) {
      snakeBody.push({x: lastX, y: lastY += directions[direction]});
    } else {
      snakeBody.push({x: lastX += directions[direction], y: lastY});
    }
    snakeBody.shift();

    for (let i = 0; i < snakeBody.length; i++) {
      const item = snakeBody[i];
      const head = snakeBody[snakeBody.length - 1];
      if (i != snakeBody.length - 1) {
        if (item.x == head.x && item.y == head.y) {
          clearInterval(refreshFrame);
        };
      }
      ctx.fillRect(item.x, item.y, ITEM_SIZE, ITEM_SIZE);
      validateSnakeCoords(item);
    }
    if (apple.x == lastX && apple.y == lastY) isAte = true;
  }, 200);
};

onkeydown = function (e) {
  let k = e.keyCode;
  if ([38,39,40,37].indexOf(k) >= 0) 
    e.preventDefault();
  if (k == 39 && direction != 3) direction = 1; // right
  if (k == 40 && direction != 4) direction = 2; // down
  if (k == 37 && direction != 1) direction = 3; // left
  if (k == 38 && direction != 2) direction = 4; // up
}

runGame();
