import { detectCollision } from "/src/collisionDetection.js";
import SnakeBlock from "/src/snakeBlock.js";

export default class SnakeBody {

    constructor(game) {
        this.game = game;
        this.maxSnakeLength = 2;
        this.snakeBlocks = [new SnakeBlock(this.game, {x: 22, y: 22})];
        this.currentSnakeLength = 0;
        this.timeoutDone = true;
        this.speedX = 0;
        this.speedY = 0;
    }

    draw(ctx) {
        this.snakeBlocks.forEach(block => block.draw(ctx));
    }

    update() {
        for (this.currentSnakeLength; this.currentSnakeLength < this.maxSnakeLength; this.currentSnakeLength++) {
            let newSnakeBlock = new SnakeBlock(this.game, {x: this.snakeBlocks[0].position.x, y: this.snakeBlocks[0].position.y});
            this.snakeBlocks = [newSnakeBlock, ...this.snakeBlocks];
        }

        if(this.timeoutDone) {
            this.timeoutDone = !this.timeoutDone;
            setTimeout(() => {
                const nextSnakeBlock = new SnakeBlock(this.game, {x: this.snakeBlocks[this.snakeBlocks.length - 1].position.x + this.speedX,
                     y: this.snakeBlocks[this.snakeBlocks.length - 1].position.y + this.speedY});
                this.snakeBlocks.splice(0,1);
                this.snakeBlocks = [...this.snakeBlocks, nextSnakeBlock];
                this.checkGameOver();
                this.timeoutDone = !this.timeoutDone;
            },60);
        }
        
        this.snakeBlocks.forEach(block => block.update());
    }

    isSnakeMoving() {
        return this.speedX !== 0 || this.speedY !== 0; 
    }

    isBlockOnSamePosition() {
        return this.snakeBlocks.slice(0, this.snakeBlocks.length - 2)
         .some(block => detectCollision(this.snakeBlocks[this.snakeBlocks.length - 1], block));
    }

    isBlockBeyondScreen() {
        const headBlock = this.snakeBlocks[this.snakeBlocks.length - 1];
        return headBlock.position.x > this.game.gameWidth ||
        headBlock.position.x < 0 ||
        headBlock.position.y > this.game.gameHeight ||
        headBlock.position.y < 0;
    }

    checkGameOver() {
        if(this.isSnakeMoving() && (this.isBlockOnSamePosition() || this.isBlockBeyondScreen())) this.game.gameOver();
    }

    setMaxSnakeLength(maxSnakeLength) {
        this.maxSnakeLength = maxSnakeLength;
    }

    reset() {
        this.maxSnakeLength = 2;
        this.currentSnakeLength = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.snakeBlocks = [new SnakeBlock(this.game, {x: 22, y: 22})];
    }

    moveDown() {
        const headBlock = this.snakeBlocks[this.snakeBlocks.length - 1];
        const beforeHeadBlock = this.snakeBlocks[this.snakeBlocks.length - 2];
        if (headBlock.position.y === beforeHeadBlock.position.y) {
            this.speedX = 0;
            this.speedY = 22;
        }
    }

    moveLeft() {
        const headBlock = this.snakeBlocks[this.snakeBlocks.length - 1];
        const beforeHeadBlock = this.snakeBlocks[this.snakeBlocks.length - 2];
        if (headBlock.position.x === beforeHeadBlock.position.x) {
            this.speedX = -22;
            this.speedY = 0;
        }
    }

    moveRight() {
        const headBlock = this.snakeBlocks[this.snakeBlocks.length - 1];
        const beforeHeadBlock = this.snakeBlocks[this.snakeBlocks.length - 2];
        if (headBlock.position.x === beforeHeadBlock.position.x) {
            this.speedX = 22;
            this.speedY = 0;
        }
    }

    moveUp() {
        const headBlock = this.snakeBlocks[this.snakeBlocks.length - 1];
        const beforeHeadBlock = this.snakeBlocks[this.snakeBlocks.length - 2];
        if (headBlock.position.y === beforeHeadBlock.position.y) {
            this.speedX = 0;
            this.speedY = -22;
        }
    }

}