import Game from "/src/game.js"

export default class Apple {

    constructor(game, position) {
        this.image = document.querySelector(".apple");
        this.game = game;
        this.position = position;
        this.size = 20;
    }

    update(position) {

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