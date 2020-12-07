import Game from "/src/game.js"

export default class Apple {

    constructor(game) {
        this.image = document.querySelector(".apple");
        this.game = game;
        this.position = {x: 0, y: 0};
        this.size = 20;
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size,
            this.size,
        );
    }

}