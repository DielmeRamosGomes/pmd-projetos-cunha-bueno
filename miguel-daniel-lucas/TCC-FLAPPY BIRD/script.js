// --- 1. Acessando a tela e definindo variáveis globais ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- CONSTANTES DO JOGO ---
const PIPE_GAP = 200; // Espaço vertical entre o cano de cima e o de baixo. Aumentado para maior facilidade!

const DIFFICULTY_MODES = {
    normal: {
        GRAVITY: 0.15,
        JUMP_STRENGTH: -2.8,
        PIPE_SPEED: 1.0,
        PIPE_SPAWN_RATE: 120,
        PIPE_WIDTH: 50
    },
    dificil: {
        GRAVITY: 0.25,
        JUMP_STRENGTH: -3.2,
        PIPE_SPEED: 2.0,
        PIPE_SPAWN_RATE: 90,
        PIPE_WIDTH: 50
    },
    impossivel: {
        GRAVITY: 0.4,
        JUMP_STRENGTH: -3.8,
        PIPE_SPEED: 2.5,
        PIPE_SPAWN_RATE: 70,
        PIPE_WIDTH: 50
    }
};

// --- ESTADOS DO JOGO ---
let frames = 0;
let score = 0;
let gameOver = false;
let gameStarted = false;
let currentDifficulty = 'normal';

// --- PONTUAÇÕES MÁXIMAS PARA CADA MODO ---
let highScores = {
    normal: 0,
    dificil: 0,
    impossivel: 0
};

// --- Funções para salvar e carregar as pontuações ---
function loadHighScores() {
    const savedScores = localStorage.getItem('flappyBirdHighScores');
    if (savedScores) {
        highScores = JSON.parse(savedScores);
    }
}

function saveHighScores() {
    localStorage.setItem('flappyBirdHighScores', JSON.stringify(highScores));
}

// --- 2. Propriedades do pássaro ---
const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    velocity: 0,
    rotation: 0,
    startScreenY: canvas.height / 2 - 20,
    startYOffset: 0,
    startScreenFloatSpeed: 0.05
};

// --- Carregando as imagens (Pássaro e Fundo) ---
const birdImage = new Image();
birdImage.src = 'bird.png';

const skyImage = new Image();
skyImage.src = 'ceu.png';

// --- Sons do jogo ---
const jumpSound = new Audio('pulo.mp3'); 
const deathSound = new Audio('morte.mp3');
const scoreSound = new Audio('ponto.mp3');

let imagesLoaded = false;
Promise.all([
    new Promise(resolve => { birdImage.onload = () => resolve(); }),
    new Promise(resolve => { skyImage.onload = () => resolve(); })
]).then(() => {
    imagesLoaded = true;
    console.log('Todas as imagens essenciais foram carregadas com sucesso.');
    gameLoop();
});

// --- 3. Propriedades dos canos ---
const pipes = [];

// --- 4. Função para criar um novo cano ---
function createPipe() {
    const topPipeHeight = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
    
    pipes.push({
        x: canvas.width,
        y: 0,
        width: DIFFICULTY_MODES[currentDifficulty].PIPE_WIDTH,
        height: topPipeHeight,
        passed: false
    });
    
    pipes.push({
        x: canvas.width,
        y: topPipeHeight + PIPE_GAP,
        width: DIFFICULTY_MODES[currentDifficulty].PIPE_WIDTH,
        height: canvas.height - topPipeHeight - PIPE_GAP,
        passed: false
    });
}

// --- 5. Lógica de atualização do jogo ---
function update() {
    bird.velocity += DIFFICULTY_MODES[currentDifficulty].GRAVITY;
    bird.y += bird.velocity;
    
    bird.rotation = Math.min(Math.PI / 4, bird.velocity * 0.1); 

    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        pipe.x -= DIFFICULTY_MODES[currentDifficulty].PIPE_SPEED;
        
        if (pipe.x + pipe.width < bird.x && !pipe.passed && i % 2 === 0) {
            score++;
            pipes[i].passed = true;
            pipes[i+1].passed = true;
            scoreSound.currentTime = 0; // REINICIA O SOM
            scoreSound.play();
        }

        if (pipe.x + pipe.width < 0) {
            pipes.splice(i, 2);
            i--;
        }
    }
}

// --- 6. Checa colisões e atualiza pontuação máxima ---
function checkCollision() {
    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        if (!gameOver) {
            deathSound.play();
        }
        gameOver = true;
        return;
    }
    
    for (let i = 0; i < pipes.length; i += 2) {
        const topPipe = pipes[i];
        const bottomPipe = pipes[i+1];
        
        const isCollidingHorizontally = bird.x < topPipe.x + topPipe.width && bird.x + bird.width > topPipe.x;
        
        if (isCollidingHorizontally) {
            if (bird.y < topPipe.height) {
                if (!gameOver) {
                    deathSound.play();
                }
                gameOver = true;
                return;
            }
            
            if (bird.y + bird.height > bottomPipe.y) {
                if (!gameOver) {
                    deathSound.play();
                }
                gameOver = true;
                return;
            }
        }
    }
    
    if (gameOver) {
        if (score > highScores[currentDifficulty]) {
            highScores[currentDifficulty] = score;
            saveHighScores();
        }
    }
}

// --- ALTERAÇÕES PARA CANOS DESENHADOS ---
function drawDetailedPipe(pipe) {
    const gradient = ctx.createLinearGradient(pipe.x, pipe.y, pipe.x + pipe.width, pipe.y);
    gradient.addColorStop(0, '#558B2F');
    gradient.addColorStop(0.5, '#8BC34A');
    gradient.addColorStop(1, '#558B2F');
    ctx.fillStyle = gradient;
    ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);

    ctx.fillStyle = '#33691E';
    ctx.fillRect(pipe.x - 2, pipe.y, pipe.width + 4, 10);
    if (pipe.y === 0) {
        ctx.fillStyle = '#33691E';
        ctx.fillRect(pipe.x - 2, pipe.height - 10, pipe.width + 4, 10);
    } else {
        ctx.fillStyle = '#33691E';
        ctx.fillRect(pipe.x - 2, pipe.y, pipe.width + 4, 10);
    }

    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    ctx.fillRect(pipe.x, pipe.y, pipe.width, pipe.height);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

// --- 7. Funções de desenho ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(skyImage, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#DED895';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

    // --- Lógica para desenhar o pássaro rotacionado ---
    if (gameStarted) {
        ctx.save();
        ctx.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
        ctx.rotate(bird.rotation);
        ctx.drawImage(birdImage, -bird.width / 2, -bird.height / 2, bird.width, bird.height);
        ctx.restore();
    } else {
        bird.x = canvas.width / 2 - bird.width / 2;
        bird.startScreenY = canvas.height / 2 - bird.height / 2 - 50;
        bird.startYOffset = Math.sin(frames * bird.startScreenFloatSpeed) * 10;
        ctx.drawImage(birdImage, bird.x, bird.startScreenY + bird.startYOffset, bird.width, bird.height);
    }
    // --- FIM DA LÓGICA DE ROTAÇÃO ---

    for (let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
        drawDetailedPipe(pipe);
    }
    
    let displayedHighScore = highScores[currentDifficulty];
    if (score > highScores[currentDifficulty]) {
        displayedHighScore = score;
    }
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('Melhor Pontuação: ' + displayedHighScore, canvas.width - 10, 20);
    
    ctx.font = 'bold 35px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(score, canvas.width / 2, 50);
}

// --- 8. Função para desenhar a tela de Game Over ---
function drawGameOverScreen() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Fim de Jogo', canvas.width / 2, canvas.height / 2 - 100);
    ctx.strokeText('Fim de Jogo', canvas.width / 2, canvas.height / 2 - 100);
    
    ctx.font = 'bold 20px Arial';
    ctx.fillText('Pontuação: ' + score, canvas.width / 2, canvas.height / 2 - 50);
    ctx.fillText('Melhor: ' + highScores[currentDifficulty], canvas.width / 2, canvas.height / 2 - 20);

    const restartButtonWidth = 150;
    const restartButtonHeight = 50;
    const restartButtonX = canvas.width / 2 - restartButtonWidth / 2;
    const restartButtonY = canvas.height / 2 + 30;

    ctx.fillStyle = 'white';
    ctx.fillRect(restartButtonX, restartButtonY, restartButtonWidth, restartButtonHeight);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(restartButtonX, restartButtonY, restartButtonWidth, restartButtonHeight);
    
    ctx.fillStyle = 'blue';
    ctx.font = 'bold 25px Arial';
    ctx.fillText('Reiniciar', canvas.width / 2, restartButtonY + restartButtonHeight / 2 + 8);

    canvas.restartButton = { x: restartButtonX, y: restartButtonY, width: restartButtonWidth, height: restartButtonHeight };
    
    const menuButtonWidth = 150;
    const menuButtonHeight = 50;
    const menuButtonX = canvas.width / 2 - menuButtonWidth / 2;
    const menuButtonY = restartButtonY + restartButtonHeight + 10;

    ctx.fillStyle = 'white';
    ctx.fillRect(menuButtonX, menuButtonY, menuButtonWidth, menuButtonHeight);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(menuButtonX, menuButtonY, menuButtonWidth, menuButtonHeight);

    ctx.fillStyle = 'blue';
    ctx.font = 'bold 25px Arial';
    ctx.fillText('Menu', canvas.width / 2, menuButtonY + menuButtonHeight / 2 + 8);

    canvas.menuButton = { x: menuButtonX, y: menuButtonY, width: menuButtonWidth, height: menuButtonHeight };
}

// --- 9. Tela de Início ---
function drawStartScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(skyImage, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#DED895';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('FlappyBird', canvas.width / 2, canvas.height / 2 - 150);
    ctx.strokeText('FlappyBird', canvas.width / 2, canvas.height / 2 - 150);

    bird.x = canvas.width / 2 - bird.width / 2;
    bird.startScreenY = canvas.height / 2 - bird.height / 2 - 50;
    bird.startYOffset = Math.sin(frames * bird.startScreenFloatSpeed) * 10;
    ctx.drawImage(birdImage, bird.x, bird.startScreenY + bird.startYOffset, bird.width, bird.height);

    const buttonWidth = 150;
    const buttonHeight = 50;
    const buttonX = canvas.width / 2 - buttonWidth / 2;

    const modes = ['normal', 'dificil', 'impossivel']; 
    const buttonColors = { normal: 'green', dificil: 'orange', impossivel: 'red' };
    
    ctx.fillStyle = 'white';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Normal: ' + highScores.normal, canvas.width / 2, canvas.height / 2 + 15);
    ctx.fillText('Difícil: ' + highScores.dificil, canvas.width / 2, canvas.height / 2 + 30);
    ctx.fillText('Impossível: ' + highScores.impossivel, canvas.width / 2, canvas.height / 2 + 45);

    modes.forEach((mode, index) => {
        const buttonY = canvas.height / 2 + 60 + (index * (buttonHeight + 10));
        
        ctx.fillStyle = 'white';
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
        
        ctx.fillStyle = buttonColors[mode];
        ctx.font = 'bold 20px Arial';
        ctx.fillText(mode.toUpperCase(), canvas.width / 2, buttonY + buttonHeight / 2 + 8);
        
        canvas[mode + 'Button'] = { x: buttonX, y: buttonY, width: buttonWidth, height: buttonHeight };
    });
}

// --- 10. Loop Principal do Jogo ---
function gameLoop() {
    if (!imagesLoaded) {
        requestAnimationFrame(gameLoop);
        return;
    }
    
    loadHighScores();

    if (!gameStarted) {
        drawStartScreen();
        frames++;
    } else if (gameOver) {
        draw();
        drawGameOverScreen();
    } else {
        update();
        checkCollision();
        draw();
        frames++;
        if (frames % DIFFICULTY_MODES[currentDifficulty].PIPE_SPAWN_RATE === 0) {
            createPipe();
        }
    }
    requestAnimationFrame(gameLoop);
}

// --- 11. Evento de Interação ---
function handleInteraction(event) {
    if (!gameStarted) {
        if (event.type === 'click') {
            const clickX = event.offsetX;
            const clickY = event.offsetY;

            if (clickX >= canvas.normalButton.x && clickX <= canvas.normalButton.x + canvas.normalButton.width &&
                clickY >= canvas.normalButton.y && clickY <= canvas.normalButton.y + canvas.normalButton.height) {
                startGame('normal');
            } else if (clickX >= canvas.dificilButton.x && clickX <= canvas.dificilButton.x + canvas.dificilButton.width &&
                         clickY >= canvas.dificilButton.y && clickY <= canvas.dificilButton.y + canvas.dificilButton.height) {
                startGame('dificil');
            } else if (clickX >= canvas.impossivelButton.x && clickX <= canvas.impossivelButton.x + canvas.impossivelButton.width &&
                         clickY >= canvas.impossivelButton.y && clickY <= canvas.impossivelButton.y + canvas.impossivelButton.height) {
                startGame('impossivel');
            }
        } else if (event.type === 'keydown') {
            startGame('normal');
        }
        return;
    }
    
    if (gameOver && event.type === 'click') {
        const clickX = event.offsetX;
        const clickY = event.offsetY;
        
        if (clickX >= canvas.restartButton.x && clickX <= canvas.restartButton.x + canvas.restartButton.width &&
            clickY >= canvas.restartButton.y && clickY <= canvas.restartButton.y + canvas.restartButton.height) {
            
            startGame(currentDifficulty);
            return;
        }

        if (clickX >= canvas.menuButton.x && clickX <= canvas.menuButton.x + canvas.menuButton.width &&
            clickY >= canvas.menuButton.y && clickY <= canvas.menuButton.y + canvas.menuButton.height) {

            resetGame();
            return;
        }
    }
    
    if (!gameOver) {
        jumpSound.currentTime = 0;
        jumpSound.play();
        bird.velocity = DIFFICULTY_MODES[currentDifficulty].JUMP_STRENGTH;
        bird.rotation = -Math.PI / 6;
    }
}

// --- 12. Inicia o Jogo com o modo selecionado ---
function startGame(difficulty) {
    currentDifficulty = difficulty;
    gameStarted = true;
    gameOver = false;
    score = 0;
    pipes.length = 0;
    frames = 0;
    
    bird.x = 50;
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    bird.rotation = 0;
}

// --- Função para resetar o jogo para a tela inicial ---
function resetGame() {
    gameStarted = false;
    gameOver = false;
    score = 0;
    pipes.length = 0;
    frames = 0;
    bird.velocity = 0;
    bird.rotation = 0;
}

document.addEventListener('keydown', handleInteraction);
document.addEventListener('click', handleInteraction);


// --- 13. Inicia o Loop do Jogo (mostrando a tela de início) ---
gameLoop();