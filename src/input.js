export default class InputHandler {

    constructor(snakeBody, game) {
        document.addEventListener("keydown", event => {
            switch(event.key) {
                case "ArrowDown":
                    snakeBody.moveDown();    
                break;

                case "ArrowLeft":
                    snakeBody.moveLeft();    
                break;

                case "ArrowRight":
                    snakeBody.moveRight();    
                break;

                case "ArrowUp":
                    snakeBody.moveUp();    
                break;
            }
        });
    }

}