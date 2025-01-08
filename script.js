// Canvas and Context Initialization
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Constants
const GRID_SIZE = 20;
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const VALID_DIRECTIONS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);
const GAME_SPEED = 100;

// Game Variables
const snake = [{ x: GRID_SIZE * 5, y: GRID_SIZE * 5 }];
let food = { x: GRID_SIZE * 10, y: GRID_SIZE * 10 };
let direction = { x: GRID_SIZE, y: 0 }; // Start moving right
let score = 0;
let lastTime = 0;

// Event Listener for Movement
document.addEventListener('keydown', (event) => {
    if (VALID_DIRECTIONS.has(event.key)) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -GRID_SIZE };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: GRID_SIZE };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -GRID_SIZE, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: GRID_SIZE, y: 0 };
                break;
        }
    }
});

// Draw the Snake
function drawSnake() {
    ctx.fillStyle = 'darkgreen';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
    });
}

// Draw the Food
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, GRID_SIZE, GRID_SIZE);
}

// Draw the Score
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Clear the Canvas
function clearCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// Move the Snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++; // Increment the score
        food = {
            x: Math.floor(Math.random() * (CANVAS_WIDTH / GRID_SIZE)) * GRID_SIZE,
            y: Math.floor(Math.random() * (CANVAS_HEIGHT / GRID_SIZE)) * GRID_SIZE,
        };
    } else {
        snake.pop(); // Remove the last segment if no food is eaten
    }
}

// Check for Collisions with Borders
function checkCollision() {
    const head = snake[0];
    return head.x < 0 || head.x >= CANVAS_WIDTH || head.y < 0 || head.y >= CANVAS_HEIGHT;
}

// Check for Collisions with Itself
function checkSelfCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Main Game Loop
function gameLoop(timestamp) {
    const timeSinceLastFrame = timestamp - lastTime;

    if (timeSinceLastFrame >= GAME_SPEED) {
        lastTime = timestamp;

        clearCanvas();
        moveSnake();

        if (checkCollision() || checkSelfCollision()) {
            alert(`Game Over! Your score: ${score}`);
            return;
        }

        drawSnake();
        drawFood();
        drawScore();
    }

    requestAnimationFrame(gameLoop);
}

// Restart Button Logic
document.getElementById('restartButton').addEventListener('click', () => {
    score = 0;
    snake.length = 1;
    snake[0] = { x: GRID_SIZE * 5, y: GRID_SIZE * 5 };
    direction = { x: GRID_SIZE, y: 0 };
    food = { x: GRID_SIZE * 10, y: GRID_SIZE * 10 };
    lastTime = 0;
    requestAnimationFrame(gameLoop);
});

// Start the Game
requestAnimationFrame(gameLoop);
