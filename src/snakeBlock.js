import {detectCollision} from "/src/collisionDetection.js";

export default class SnakeBlock {

    constructor(game, position) {
        this.width = 20;
        this.height = 20;
        this.game = game;
        this.position = {
            x: position.x,
            y: position.y
        };
    }

    draw(ctx) {
        ctx.fillStyle = "#32cb00";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if(detectCollision(this, this.game.apple)) this.game.onAppleCollision();
    }   

}