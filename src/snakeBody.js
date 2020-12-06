import SnakeBlock from "/src/snakeBlock.js";

export default class SnakeBody {

    constructor(game) {
        this.game = game;
        this.length = 5;
        this.lastSnakeBlock = new SnakeBlock(20, 20);
        this.snakeBlocks = [this.lastSnakeBlock];
        this.currentLength = 0;
        this.timeoutDone = true;
        this.speedX = 0;
        this.speedY = 0;
    }

    draw(ctx) {
        for (this.currentLength; this.currentLength < this.length; this.currentLength++) {
            let nextSnakeBlock = new SnakeBlock(this.lastSnakeBlock.position.x + this.speedX, this.lastSnakeBlock.position.y + this.speedY);
            this.snakeBlocks = [...this.snakeBlocks, nextSnakeBlock];
            this.lastSnakeBlock = nextSnakeBlock;
        }

        if(this.timeoutDone) {
            this.timeoutDone = !this.timeoutDone;
            setTimeout(() => {
                let nextSnakeBlock = new SnakeBlock(this.snakeBlocks[this.snakeBlocks.length - 1].position.x + this.speedX, this.snakeBlocks[this.snakeBlocks.length - 1].position.y + this.speedY);
                this.snakeBlocks.splice(0,1);
                this.snakeBlocks = [...this.snakeBlocks, nextSnakeBlock];
                this.timeoutDone = !this.timeoutDone;
            },60);
        }
        

        this.snakeBlocks.forEach(block => block.draw(ctx));
    }

    moveDown() {
        // if(this.speedY === 0) {
            this.speedX = 0;
            this.speedY = 22;
        // }
    }

    moveLeft() {
        // if (this.speedX === 0) {
            this.speedX = -22;
            this.speedY = 0;
        // }
    }

    moveRight() {
        // if (this.speedX === 0) {
            this.speedX = 22;
            this.speedY = 0;
        // }
    }

    moveUp() {
        // if (this.speedY === 0) {
            this.speedX = 0;
            this.speedY = -22;
        // }
    }

}