export default class SnakeBlock {

    constructor(x,y) {
        this.width = 20;
        this.height = 20;
        this.position = {
            x: x,
            y: y
        };
    }

    draw(ctx) {
        ctx.fillStyle = "#32cb00";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

}