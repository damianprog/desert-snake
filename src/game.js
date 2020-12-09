import Apple from "/src/apple.js";
import InputHandler from "/src/input.js";
import SnakeBody from "/src/snakeBody.js";

const GAME_STATE = {
    WELCOME_MENU: 0,
    PAUSED: 1,
    RUNNING: 2,
    GAMEOVER: 3
};

export default class Game {

    setApple() {
        const xyPositions = [];

        for (let posY = 0; posY < this.gameHeight; posY += 22) {
            for (let posX = 0; posX < this.gameWidth; posX += 22) {
                xyPositions.push({x: posX, y: posY});
            }
        }

        const snakeBlocksPositions = 
            this.snakeBody.snakeBlocks.map(block => (JSON.stringify({x: block.position.x, y: block.position.y})));

        const emptyPositions = xyPositions.filter(xy => snakeBlocksPositions.indexOf(JSON.stringify(xy)) === -1);

        const randomEmptyPositionsIndex = Math.floor(Math.random() * emptyPositions.length);
        this.apple.setPosition(emptyPositions[randomEmptyPositionsIndex]);
    }

    start() {
        if (this.gameState !== GAME_STATE.RUNNING && this.gameState !== GAME_STATE.PAUSED) {
            this.snakeBody.reset();
            this.setApple();
            this.pointsCounter.innerHTML = 0;
            this.gameState = GAME_STATE.RUNNING;
        }
    }

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameState = GAME_STATE.WELCOME_MENU;
        this.snakeBody = new SnakeBody(this);
        this.apple = new Apple();
        this.pointsCounter = document.querySelector(".points-counter");

        new InputHandler(this.snakeBody, this);
    }

    onAppleCollision() {
        this.pointsCounter.innerHTML = parseInt(this.pointsCounter.innerHTML) + 1;
        this.setApple();
        this.snakeBody.setMaxSnakeLength(this.snakeBody.maxSnakeLength + 2);
    }

    pause() {
        if (this.gameState !== GAME_STATE.GAMEOVER) {
            this.gameState = this.gameState === GAME_STATE.RUNNING ? GAME_STATE.PAUSED : GAME_STATE.RUNNING;
        } 
    }

    gameOver() {
        this.gameState = GAME_STATE.GAMEOVER;
    }

    darkenBackground(ctx) {
        ctx.rect(0, 0, this.gameWidth, this.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fill();
    }

    setFontStyle(ctx) {
        ctx.font = "20px PressStart2P";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
    }

    draw(ctx) {
        if (this.gameState !== GAME_STATE.WELCOME_MENU) {
            this.snakeBody.draw(ctx);
            this.apple.draw(ctx);
        }
        
        if (this.gameState === GAME_STATE.WELCOME_MENU) {
            this.darkenBackground(ctx);
            this.setFontStyle(ctx);
            ctx.fillText("Desert Snake", this.gameWidth / 2, (this.gameHeight / 2) - 50);
            ctx.fillText("Press SPACEBAR to START", this.gameWidth / 2, this.gameHeight / 2);
        }

        if (this.gameState === GAME_STATE.GAMEOVER) {
            this.darkenBackground(ctx);
            this.setFontStyle(ctx);
            ctx.fillText("Game Over!", this.gameWidth / 2, (this.gameHeight / 2) - 50);
            ctx.fillText("Your Score: " + this.pointsCounter.innerHTML, this.gameWidth / 2, this.gameHeight / 2);
            ctx.fillText("Press SPACEBAR to restart", this.gameWidth / 2, (this.gameHeight / 2) + 50);
        }

        if (this.gameState === GAME_STATE.PAUSED) {
            this.darkenBackground(ctx);
            this.setFontStyle(ctx);
            ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
        }
    }

    update() {
        if (this.gameState === GAME_STATE.GAMEOVER || this.gameState === GAME_STATE.PAUSED) return;
        this.snakeBody.update();
    }

    clear(ctx) {
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    }

}