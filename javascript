// game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: 50,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: "green",
    speed: 5,
    velocityY: 0,
    jumpPower: -15,
    isJumping: false,
};

const gravity = 0.8;
let platforms = [
    { x: 100, y: canvas.height - 50, width: 300, height: 20 },
    { x: 500, y: canvas.height - 150, width: 300, height: 20 },
    { x: 900, y: canvas.height - 250, width: 300, height: 20 },
];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = "blue";
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function updatePlayer() {
    player.velocityY += gravity;
    player.y += player.velocityY;

    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.isJumping = false;
    }

    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height
        ) {
            player.y = platform.y - player.height;
            player.isJumping = false;
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawPlatforms();
    updatePlayer();

    requestAnimationFrame(gameLoop);
}

function handleInput(event) {
    if (event.key === "ArrowRight") player.x += player.speed;
    if (event.key === "ArrowLeft") player.x -= player.speed;
    if (event.key === " " && !player.isJumping) {
        player.velocityY = player.jumpPower;
        player.isJumping = true;
    }
}

window.addEventListener("keydown", handleInput);
gameLoop();
