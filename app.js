const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

//GRID
const brickSize = 10;
const widthDivision = width / brickSize;
const heightDivision = height / brickSize;

//functions


//drawing border
function drawBorder() {
    ctx.fillStyle = "rgba( 0 , 0 , 0, 0.2)";
    ctx.fillRect(0, 0, width, brickSize);
    ctx.fillRect(0, height - brickSize, width, brickSize);
    ctx.fillRect(0, 0, brickSize, height);
    ctx.fillRect(width - brickSize, 0, brickSize, height);
}

function interval() {
    ctx.clearRect(0, 0, width, height);
    drawBorder();
    play = requestAnimationFrame(interval);

}
let play = requestAnimationFrame(interval);