import Apple from "/src/apple.js";
import InputHandler from "/src/input.js";
import SnakeBody from "/src/snakeBody.js";

export default class Game {

    updateDimensions(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    setApple() {
        const xPositions = [];
        const yPositions = [];
        for (let i = 0; i < 792; i += 22) {
            xPositions.push(i);
            if (i < 484) {
                yPositions.push(i);
            }
        }

        const randomXPositionsIndex = Math.floor(Math.random() * xPositions.length);
        const randomYPositionsIndex = Math.floor(Math.random() * yPositions.length);

        this.apple = new Apple(this, { x: xPositions[randomXPositionsIndex], y: yPositions[randomYPositionsIndex] });
    }

    constructor(gameWidth, gameHeight, ctx) {
        this.updateDimensions(gameWidth, gameHeight);
        this.snakeBody = new SnakeBody(this);
        this.setApple();

        new InputHandler(this.snakeBody, this);
    }

    draw(ctx) {
        this.snakeBody.draw(ctx);
        this.apple.draw(ctx);
    }

    update() {


    }

    clear(ctx) {
        ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    }

}