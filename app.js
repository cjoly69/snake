const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//GRID
const brickSize = 10;
const widthDivision = width / brickSize;
const heightDivision = height / brickSize;

//functions


//drawing border, bricks
function drawBorder() {
    ctx.fillStyle = "rgba( 0 , 0 , 0, 0.2)";
    ctx.fillRect(0, 0, width, brickSize);
    ctx.fillRect(0, height - brickSize, width, brickSize);
    ctx.fillRect(0, 0, brickSize, height);
    ctx.fillRect(width - brickSize, 0, brickSize, height);
}

function interval() {
    ctx.clearRect(0, 0, width, height);
    mySnake.draw();
    drawBorder();
    oneBrick.drawSquare("pink");
    play = requestAnimationFrame(interval);

}
let play = requestAnimationFrame(interval);

//for my bricks, contruction and color, construction of my snake

class Brick {

    constructor(col, row) {
        this.col = col;
        this.row = row;

    }

    drawSquare(color) {
        const x = this.col * brickSize;
        const y = this.row * brickSize;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, brickSize, brickSize)
    }
}

const oneBrick = new Brick(20, 35);

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
        this.parts.map(part => part.drawSquare("red"));

    }
}

const mySnake = new Snake();