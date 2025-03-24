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
    [' ', ' ', ' ', 'X', 'X', 'X', ' ', 'X', ' ', 'X'],
    ['X', 'X', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'X', ' ', 'X', 'X', 'X', 'X', ' '],
    [' ', 'X', ' ', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', 'X', ' ', 'X', 'X', 'X', 'X', 'X', ' ', 'T'],
];

const gameContainer = document.getElementById('game-container');
let playerPos = { x: 0, y: 0 };

// Function to start the game
function startGame() {
    if (gameStarted) return;
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

// Function to draw the maze and player
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

// Function to handle player movement
function movePlayer(dx, dy) {
    const newX = playerPos.x + dx;
    const newY = playerPos.y + dy;

    // Check for out-of-bounds movement or walls
    if (newX < 0 || newX >= maze[0].length || newY < 0 || newY >= maze.length) return;
    if (maze[newY][newX] === 'X') return;

    playerPos = { x: newX, y: newY };
    drawMaze();

    // Check for win condition
    if (maze[newY][newX] === 'T') {
        triggerExplosion();
    }
}

// Function to trigger explosion animation and sound
function triggerExplosion() {
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reset background music
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

    // Remove explosion and show invite after 1 second
    setTimeout(() => {
        document.body.removeChild(explosion);
        showInvite();
    }, 1000);
}

// Function to show invite after explosion
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
        window.location.href = 'https://partiful.com/e/RRNUhE4sVss0RLJkJBAx';
    }, 2000);
}

// Function to reset the game
function resetGame() {
    playerPos = { x: 0, y: 0 };
    drawMaze();
}

// Function to show volume alert on page load
function showVolumeAlert() {
    setTimeout(() => {
        alert('🔊 Turn on your volume for the best experience!');
    }, 500); // Small delay for better user experience
}

// Start game after user clicks the button
window.onload = () => {
    document.getElementById('start-btn').addEventListener('click', startGame);
    showVolumeAlert(); // Alert when page loads
};



