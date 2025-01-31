const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/ground.jpeg";

const carrot_image = new Image()
carrot_image.src = "img/carrot.jpeg"
let box = 32;

let score = 0;

let carrot = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
   
};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
document.addEventListener("keydown", direction);
let dir;
function direction(event) {
    if(event.keyCode == 37 && dir != "right")
        dir="left";
    if(event.keyCode == 38 && dir != "down")
        dir="up";
    if(event.keyCode == 39 && dir != "left")
        dir="right";
    if(event.keyCode == 40 && dir != "up")
        dir="down";
}
function eatTail(head,arr) {
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}
function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(carrot_image, carrot.x, carrot.y);
  
    for(let i = 0; i < snake.length; i++) {
      if ( i == 0) 
        ctx.fillStyle = "Maroon";
      else if (i%2 ==0)
        ctx.fillStyle = "Brown";
      else 
        ctx.fillStyle = "Red";
  
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
      ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
  
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);
  
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
  
    if(snakeX == carrot.x && snakeY == carrot.y) {
      score++;
      carrot = {
        x: Math.floor((Math.random() * 17 + 1)) * box,
        y: Math.floor((Math.random() * 15 + 3)) * box,
      };
    } else {
      snake.pop();
    }
  
    if(snakeX < box || snakeX > box * 17
      || snakeY < 3 * box || snakeY > box * 17)
      clearInterval(game);
  
    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;
  
    let newHead = {
      x: snakeX,
      y: snakeY
    };
  
    eatTail(newHead, snake);
  
    snake.unshift(newHead);
  }
  
  let game = setInterval(drawGame, 100);
  