export function detectCollision(snakeBlock, gameObject) {
    return snakeBlock.position.x == gameObject.position.x && 
     snakeBlock.position.y == gameObject.position.y;
}