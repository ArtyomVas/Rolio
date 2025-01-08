
const canvas = document.getElementById('gameCanvas'); // Use your existing canvas
const ctx = canvas.getContext('2d'); // Get the 2D context
const gridSize = 20; // Size of each grid cell (in pixels)
const snake = [{ x: gridSize * 5, y: gridSize * 5 }]; // Initial position of the snake
let food = { x: gridSize * 10, y: gridSize * 10 }; // Initial position of the food
let direction = { x: gridSize, y: 0 }; // Initial direction (moving right)

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

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

// Function to move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // Add the new head

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        // Reposition food
        food = {
            x: Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize,
            y: Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize,
        };
    } else {
        snake.pop(); // Remove the last segment if no food is eaten
    }
}

// Main draw function
function draw() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
}

// Run the draw function every 100ms
setInterval(draw, 100);
