const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//GRID
const brickSize = 10;
const widthDivision = width / brickSize;
const heightDivision = height / brickSize;

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

// listening events
const directions = {
    37 : "left",
    38 : "up",
    39 : "right",
    40 : "down"
};

addEventListener("keydown", function(event) {
    const newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
        mySnake.setDirection(newDirection);
    }
});

function interval() {
    ctx.clearRect(0, 0, width, height);
    mySnake.moveSnake();
    mySnake.draw();
    drawBorder();
 //   oneBrick.drawSquare("pink");

    setTimeout(() => play = requestAnimationFrame(interval), 70);
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
        ctx.fillRect(x, y, brickSize, brickSize);
    }
}

//const oneBrick = new Brick(20, 35);

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
        this.parts.map( part => part.drawSquare("red"));
    }

    setDirection(newDirection) {
        this.direction = newDirection;
    }

    moveSnake() {
        const head = this.parts[0];
        let newHead;

        if (this.direction === "right") {
            newHead = new Brick(head.col +1, head.row);
        }
        else if (this.direction === "left") {
            newHead = new Brick(head.col -1, head.row);
        }
        else if (this.direction === "up") {
            newHead = new Brick(head.col , head.row -1);
        }
        else if (this.direction === "down") {
            newHead = new Brick(head.col , head.row +1);
        }

        this.parts.unshift(newHead);
        this.parts.pop();

    }
}

const mySnake = new Snake();