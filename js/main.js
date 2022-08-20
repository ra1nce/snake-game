let scoreBlock;
let score = 0;

const config = {
    step: 0,
    maxStep: 6,
    sizeCell: 24,
    sizeBerry: 8
} 

const snake = {
    x: 240,
    y: 240,
    dx: config.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 3,
    direction: "right"
}

let berry = {
    x: 24,
    y: 24
}


let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector("#score-count");

randomPositionBerry();
drawScore();
drawBerry();
requestAnimationFrame( gameLoop );


function gameLoop() {

	requestAnimationFrame( gameLoop );
	if ( ++config.step < config.maxStep) {
		return;
	}
	config.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	drawBerry();
	drawSnake();
}

function drawSnake() {
	snake.x += snake.dx;
	snake.y += snake.dy;

	collisionBorder();

	snake.tails.unshift( { x: snake.x, y: snake.y } );

	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}

	snake.tails.forEach( function(el, index){
		if (index == 0) {
			context.fillStyle = "#0EE724";
		} else {
			context.fillStyle = "#048C12";
		}
		context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

		if ( el.x === berry.x && el.y === berry.y ) {
			snake.maxTails++;
			incScore();
			randomPositionBerry();
		}

		for( let i = index + 1; i < snake.tails.length; i++ ) {

			if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
				refreshGame();
			}

		}

	} );
}


function collisionBorder() {
	if (snake.x < 0) {
		snake.x = canvas.width - config.sizeCell;
	} else if ( snake.x >= canvas.width ) {
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - config.sizeCell;
	} else if ( snake.y >= canvas.height ) {
		snake.y = 0;
	}
}


function refreshGame() {
	score = 0;
	drawScore();

	snake.x = 240;
	snake.y = 240;
	snake.tails = [];
	snake.maxTails = 3;
	snake.dx = config.sizeCell;
	snake.dy = 0;

	randomPositionBerry();
}


function drawBerry() {
    context.beginPath();
    context.fillStyle = "#FF005C";
    context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
	context.fill();
}


function randomPositionBerry() {
    berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell;
    berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell;
}

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}


function randomPositionBerry() {
	berry.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell;
	berry.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell;
}


function incScore() {
	score++;
	drawScore();
}


function drawScore() {
	scoreBlock.innerHTML = score;
}


function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}


document.addEventListener("keydown", function (e) {
	if ( e.code == "KeyW"  && ["left", "right"].includes(snake.direction)) {
		snake.dy = -config.sizeCell;
		snake.dx = 0;
        snake.direction = "up";

	} else if ( e.code == "KeyA"  && ["down", "up"].includes(snake.direction)) {
		snake.dx = -config.sizeCell;
		snake.dy = 0;
        snake.direction = "left";

	} else if ( e.code == "KeyS"  && ["left", "right"].includes(snake.direction)) {
		snake.dy = config.sizeCell;
		snake.dx = 0;
        snake.direction = "down";

	} else if ( e.code == "KeyD" && ["down", "up"].includes(snake.direction)) {
		snake.dx = config.sizeCell;
		snake.dy = 0;
        snake.direction = "right";
	}
});