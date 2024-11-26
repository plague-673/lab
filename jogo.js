const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

// Variáveis do jogo
let player = { x: 20, y: 20, size: 20, color: "#ff69b4" };
let goal = { x: 360, y: 360, size: 20, color: "#ffd1dc" };
let walls = [
    { x: 50, y: 0, width: 20, height: 300 },
    { x: 150, y: 100, width: 20, height: 300 },
    { x: 250, y: 0, width: 20, height: 300 }
];

// Movimentação
let keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// Função para desenhar o jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o jogador
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Desenha o objetivo
    ctx.fillStyle = goal.color;
    ctx.fillRect(goal.x, goal.y, goal.size, goal.size);

    // Desenha as paredes
    ctx.fillStyle = "#d8bfd8";
    walls.forEach((wall) => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

// Função de atualização
function update() {
    if (keys["ArrowUp"]) player.y -= 2;
    if (keys["ArrowDown"]) player.y += 2;
    if (keys["ArrowLeft"]) player.x -= 2;
    if (keys["ArrowRight"]) player.x += 2;

    // Colisão com as paredes
    walls.forEach((wall) => {
        if (
            player.x < wall.x + wall.width &&
            player.x + player.size > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.size > wall.y
        ) {
            // Empurra o jogador para fora
            if (keys["ArrowUp"]) player.y += 2;
            if (keys["ArrowDown"]) player.y -= 2;
            if (keys["ArrowLeft"]) player.x += 2;
            if (keys["ArrowRight"]) player.x -= 2;
        }
    });

    // Verifica se o jogador chegou ao objetivo
    if (
        player.x < goal.x + goal.size &&
        player.x + player.size > goal.x &&
        player.y < goal.y + goal.size &&
        player.y + player.size > goal.y
    ) {
        document.getElementById("winScreen").classList.remove("hidden");
    }
}

// Loop do jogo
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// Botões de controle
document.getElementById("upButton").addEventListener("click", () => {
    player.y -= 5;
});
document.getElementById("downButton").addEventListener("click", () => {
    player.y += 5;
});
document.getElementById("leftButton").addEventListener("click", () => {
    player.x -= 5;
});
document.getElementById("rightButton").addEventListener("click", () => {
    player.x += 5;
});