import Game from "/src/game.js";

let canvas = document.querySelector("canvas");

let ctx = canvas.getContext("2d");

const GAME_WIDTH = 792;
const GAME_HEIGHT = 484;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    game.clear(ctx);

    game.update(deltaTime);
    game.draw(ctx);

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);







