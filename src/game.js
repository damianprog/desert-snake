import Apple from "/src/apple.js";
import InputHandler from "/src/input.js";
import SnakeBody from "/src/snakeBody.js";

export default class Game {

    setApple() {
        const xPositions = [];
        const yPositions = [];
        for (let i = 0; i < this.gameWidth; i += 22) {
            xPositions.push(i);
            if (i < this.gameHeight) {
                yPositions.push(i);
            }
        }

        const randomXPositionsIndex = Math.floor(Math.random() * xPositions.length);
        const randomYPositionsIndex = Math.floor(Math.random() * yPositions.length);

        this.apple.setPosition({x: xPositions[randomXPositionsIndex], y: yPositions[randomYPositionsIndex]});
    }

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.snakeBody = new SnakeBody(this);
        this.apple = new Apple();
        this.setApple();

        new InputHandler(this.snakeBody, this);
    }

    onAppleCollision() {
        this.setApple();
        this.snakeBody.setMaxSnakeLength(this.snakeBody.maxSnakeLength + 3);
    }

    gameOver() {
       console.log("Game Over!");
    }

    draw(ctx) {
        this.snakeBody.draw(ctx);
        this.apple.draw(ctx);
    }

    update() {
        this.snakeBody.update();
    }

    clear(ctx) {
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    }

}