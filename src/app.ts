//jshint esversion: 6

let apple: { x: number; y: number; width: number; height: number; color: string; update: () => void; };
let score: number = 0;
let scoreBoard: { update: () => void; };
let snake: { x: number; y: number; width: number; height: number; color: string; speedX: number; speedY: number; newPos: () => void; update: () => void; hitBorder: () => void; hitApple: () => void; };

// start game
let startGame = () => {
    gameArea.start();
    apple = new component(40, 40, 5, 5, "red");
    snake = new component(20, 20, 10, 10, "lime");
    scoreBoard = new component(10, 10, 10, 10, "white", "text");
};

// create & control the game area
let gameArea = {
    canvas: document.createElement("canvas"),
    context: undefined,
    keys: undefined,
    start: function () {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(refresh, 20);
        window.addEventListener("keydown", (e) => {
            e.preventDefault();
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener("keyup", (e) => {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        });
    },
    stop: function () {
        clearInterval(this.interval);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

// create components with a common framework
function component( x: number, y: number, width: number, height: number, color: string, type?: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        let ctx = gameArea.context;
        if (type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            this.text = "SCORE: " + score;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y -= this.speedY;
    };
    this.hitBorder = function () {
        let leftBorder = 0;
        let topBorder = 0;
        let rightBorder = gameArea.canvas.width - this.width;
        let bottomBorder = gameArea.canvas.height - this.height;
        if (this.x <= leftBorder) {
            this.x = leftBorder;
        } if (this.y <= topBorder) {
            this.y = topBorder;
        } if (this.x >= rightBorder) {
            this.x = rightBorder;
        } if (this.y >= bottomBorder) {
            this.y = bottomBorder;
        }
    };
    this.hitApple = function () {
        let leftApple = apple.x;
        let topApple = apple.y;
        let rightApple = apple.x + apple.width;
        let bottomApple = apple.y + apple.height;
        if (this.x > rightApple || (this.x + this.width) < leftApple ||
            this.y > bottomApple || (this.y + this.height) < topApple) {
            return (false);
        } else {
            // update score
            score++;
            apple.update();
            // move apple to random location within canvas
            apple.x = Math.floor(Math.random() * (gameArea.canvas.width - apple.width));
            apple.y = Math.floor(Math.random() * (gameArea.canvas.height - apple.height));
        }
    };
}

// create refresh
let refresh = () => {
    gameArea.clear();
    if (gameArea.keys && gameArea.keys[37]) {
        snake.speedX = -2;
        snake.speedY = 0;
    }
    if (gameArea.keys && gameArea.keys[38]) {
        snake.speedY = 2;
        snake.speedX = 0;
    }
    if (gameArea.keys && gameArea.keys[39]) {
        snake.speedX = 2;
        snake.speedY = 0;
    }
    if (gameArea.keys && gameArea.keys[40]) {
        snake.speedY = -2;
        snake.speedX = 0;
    }
    snake.newPos();
    snake.update();
    snake.hitBorder();
    snake.hitApple();
    apple.update();
    scoreBoard.update();
};