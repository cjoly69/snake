const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

let endGame = false;

//GRID
const brickSize = 10;
const widthDivision = width / brickSize;
const heightDivision = height / brickSize;


//Score
let score = 0;
const bestScore = localStorage.getItem("bestScore") || 0;

/*
My bricks, contruction and color, construction of my snake
 */

class Brick {

    constructor(col, row) {
        this.col = col;
        this.row = row;

    }

    drawSquare(color) {
        const x = this.col * brickSize;
        const y = this.row * brickSize;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, brickSize, brickSize);
    }

    drawApple(color) {
        const centerX = (this.col * brickSize) + (brickSize / 2);
        const centerY = (this.row * brickSize) + (brickSize / 2);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(centerX, centerY, brickSize / 2, 0, Math.PI * 2, false);
        ctx.fill();
    }

    hitBorder(brick) {
        return this.col === brick.col && this.row === brick.row;
    }
}

/*
Snake
 */
class Snake {
    constructor() {
        this.parts = [
            new Brick(10, 15),
            new Brick(9, 15),
            new Brick(8, 15)
        ];
        this.direction = "right";
    }

    draw() {
        this.parts.map(part = > part.drawSquare("red")
    )
        ;
    }

    setDirection(newDirection) {
        this.direction = newDirection;
    }

    headCollision(head) {
        const leftHit = head.col === 0;
        const topHit = head.row === 0;
        const bottomHit = head.col === heightDivision - 1;
        const rightHit = head.row === widthDivision - 1;

        const borderCollision = leftHit || topHit || bottomHit || rightHit;

        let selfHit = false;
        this.parts.map((part) => {
            if (head.hitBorder(part)){
            selfHit = true;
            }
        });
        return selfHit || borderCollision;
    }

    moveSnake() {
        const head = this.parts[0];
        let newHead;

        if (this.direction === "right") {
            newHead = new Brick(head.col + 1, head.row);
        }
        else if (this.direction === "left") {
            newHead = new Brick(head.col - 1, head.row);
        }
        else if (this.direction === "up") {
            newHead = new Brick(head.col, head.row - 1);
        }
        else if (this.direction === "down") {
            newHead = new Brick(head.col, head.row + 1);
        }

        //game over
        if (this.headCollision(newHead)) {
            gameOver();
            return;
        }

        this.parts.unshift(newHead);
        if (newHead.hitBorder(apple.position)) {
            score += 1;//if collision score is increase
            apple.move();
        }
        else {
            this.parts.pop();
        }

    }
}

const mySnake = new Snake();

/*
 Apple
 */

class Apple {
    constructor() {
        this.position = new Brick(
            Math.floor(Math.random() * (widthDivision - 2)) + 1,
            Math.floor(Math.random() * (heightDivision - 2)) + 1
        );
    }

    draw() {
        this.position.drawApple("#BADA55");
    }

    move() {
        const randomCol = Math.floor(Math.random() * (widthDivision - 2)) + 1;
        const randomRow = Math.floor(Math.random() * (heightDivision - 2)) + 1;
        this.position = new Brick(randomCol, randomRow);
    }
}

const apple = new Apple();

/*
 functions
 */


//drawing border, bricks
function drawBorder() {
    ctx.fillStyle = "rgba( 0 , 0 , 0, 0.2)";
    ctx.fillRect(0, 0, width, brickSize);
    ctx.fillRect(0, height - brickSize, width, brickSize);
    ctx.fillRect(0, 0, brickSize, height);
    ctx.fillRect(width - brickSize, 0, brickSize, height);
}

//best score
function bestScore() {
    ctx.font = "20px Monospace";
    ctx.fillStyle = "#FF0000";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText(`Best:${bestScore}./10`, brickSize, brickSize * 2 );
}

function saveBestScore() {
    if (score > bestScore) {
        localStorage.setItem("bestScore", score);
    }
}

function speedGame() {
    const start = 80;
    const end = 20;
    const maxScore = 10;
    const delay = Math.floor(Math.max(start - (start - end) * score / maxScore));
    console.log(delay);
    return delay;
}

function gameOver() {
    ctx.font = "50px Monospace";
    ctx.fillStyle = "#FF0000";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", width / 2, height / 2);
    endGame = true;
}

// listening events
const directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

addEventListener("keydown", function (event) {
    if (endGame) {
        location.reload();
    }

    const newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        mySnake.setDirection(newDirection);
    }
});

function interval() {
    if (endGame) {
        saveBestScore();
        cancelAnimationFrame(play);
        return;
    }
    ctx.clearRect(0, 0, width, height);
    bestScore();
    saveBestScore()
    mySnake.moveSnake();
    mySnake.draw();
    apple.draw();
    drawBorder();

    setTimeout(() = > play = requestAnimationFrame(interval), speedGame());
}

let play = requestAnimationFrame(interval);