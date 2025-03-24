// Global state
let backgroundMusic;
let gameStarted = false;

// Maze structure (10x10 grid)
const maze = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'X', 'X', 'X', ' ', 'X', 'X', 'X', 'X', ' '],
    [' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' '],
    [' ', 'X', ' ', 'X', 'X', 'X', 'X', ' ', 'X', ' '],
    [' ', 'X', ' ', ' ', ' ', ' ', ' ', ' ', 'X', ' '],
    [' ', ' ', ' ', 'X', 'X', 'X', ' ', 'X', ' ', 'x'],
    ['X', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'X', ' ', 'X', 'X', 'X', 'X', ' '],
    [' ', 'X', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'X', ' ', 'X', 'X', 'X', 'X', 'X', ' ', 'T'],
];

const gameContainer = document.getElementById('game-container');
let playerPos = { x: 0, y: 0 };

// Start game after button click
function startGame() {
    if (gameStarted) return; // Prevent multiple starts
    gameStarted = true;

    // Hide the start button
    document.getElementById('start-btn').style.display = 'none';

    // Start background music after user interaction
    backgroundMusic = new Audio('assets/background.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;

    backgroundMusic.play()
        .then(() => console.log("Background music started"))
        .catch(error => console.error("Autoplay blocked:", error));

    // Draw initial maze state
    drawMaze();
}

// Draw the maze and player position
function drawMaze() {
    gameContainer.innerHTML = '';

    maze.forEach((row, y) => {
        row.forEach((cell, x) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');

            if (cell === 'X') cellElement.classList.add('wall');
            if (x === playerPos.x && y === playerPos.y) cellElement.classList.add('player');
            if (cell === 'T') cellElement.classList.add('trophy');

            gameContainer.appendChild(cellElement);
        });
    });
}

// Handle player movement
function movePlayer(dx, dy) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Prevent out-of-bounds movement and walls
    if (newX < 0 || newX >= maze[0].length || newY < 0 || newY >= maze.length) return;
    if (maze[newY][newX] === 'X') return;

    playerPos = { x: newX, y: newY };
    drawMaze();

    // Check if player reaches the trophy
    if (maze[newY][newX] === 'T') {
        triggerExplosion();
    }
}

function triggerExplosion() {
    // 🔥 Stop background music when explosion starts
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reset to start if game restarts
    }

    // Create explosion overlay
    const explosion = document.createElement('div');
    explosion.style.position = 'fixed';
    explosion.style.left = '50%';
    explosion.style.top = '50%';
    explosion.style.width = '100vw';
    explosion.style.height = '100vh';
    explosion.style.backgroundImage = 'url("assets/explosion.gif")';
    explosion.style.backgroundSize = 'cover';
    explosion.style.backgroundRepeat = 'no-repeat';
    explosion.style.backgroundPosition = 'center';
    explosion.style.transform = 'translate(-50%, -50%)';
    explosion.style.zIndex = '9999';

    document.body.appendChild(explosion);

    // Play explosion sound
    const explosionSound = new Audio('assets/explosion.mp3');
    explosionSound.play();

    // Remove explosion and show invite message after 1 second
    setTimeout(() => {
        document.body.removeChild(explosion);
        showInvite();
    }, 1000);
}

// Show invite message after explosion
function showInvite() {
    const inviteMessage = document.createElement('div');
    inviteMessage.innerText = "🎉 YOU'RE INVITED TO CEDAR'S BIRTHDAY! 🎉";
    inviteMessage.style.position = 'fixed';
    inviteMessage.style.left = '50%';
    inviteMessage.style.top = '50%';
    inviteMessage.style.transform = 'translate(-50%, -50%)';
    inviteMessage.style.fontSize = '3rem';
    inviteMessage.style.fontWeight = 'bold';
    inviteMessage.style.color = '#ff0000';
    inviteMessage.style.textAlign = 'center';
    inviteMessage.style.padding = '20px';
    inviteMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    inviteMessage.style.border = '4px solid #ff0000';
    inviteMessage.style.borderRadius = '20px';
    inviteMessage.style.zIndex = '9999';

    document.body.appendChild(inviteMessage);

    // Redirect to party link after 2 seconds
    setTimeout(() => {
        window.location.href = 'https://www.example.com/cedars-birthday'; // Change to real link
    }, 2000);
}

// Reset game state (if needed)
function resetGame() {
    playerPos = { x: 0, y: 0 };
    drawMaze();
}

// Start game after user clicks the button
window.onload = () => {
    document.getElementById('start-btn').addEventListener('click', startGame);
};



