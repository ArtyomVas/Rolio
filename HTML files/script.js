// Initialize the canvas and context
const canvas = document.getElementById('gameCanvas'); // Use your existing canvas
const ctx = canvas.getContext('2d'); // Get the 2D context

// Game state
const gridSize = 20; // Size of each grid cell (in pixels)
const snake = [
    { x: gridSize * 5, y: gridSize * 5 }, // Initial position of the snake
];
let food = { x: gridSize * 10, y: gridSize * 10 }; // Initial position of the food

// Function to draw the snake
function drawSnake() {
    ctx.fillStyle = 'darkgreen';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Function to draw the food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clears the entire canvas
}

// Main draw function
function draw() {
    clearCanvas();
    drawSnake();
    drawFood();
}

// Run the draw function every 100ms
setInterval(draw, 100);
