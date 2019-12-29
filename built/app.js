//jshint esversion: 6
var apple;
var score = 0;
var scoreBoard;
var snake;
// start game
var startGame = function () {
    gameArea.start();
    apple = new component(40, 40, 5, 5, "red");
    snake = new component(20, 20, 10, 10, "lime");
    scoreBoard = new component(10, 10, 10, 10, "white", "text");
};
// create & control the game area
var gameArea = {
    canvas: document.createElement("canvas"),
    context: undefined,
    keys: undefined,
    start: function () {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(refresh, 20);
        window.addEventListener("keydown", function (e) {
            e.preventDefault();
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener("keyup", function (e) {
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
function component(x, y, width, height, color, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        var ctx = gameArea.context;
        if (type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            this.text = "SCORE: " + score;
            ctx.fillText(this.text, this.x, this.y);
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y -= this.speedY;
    };
    this.hitBorder = function () {
        var leftBorder = 0;
        var topBorder = 0;
        var rightBorder = gameArea.canvas.width - this.width;
        var bottomBorder = gameArea.canvas.height - this.height;
        if (this.x <= leftBorder) {
            this.x = leftBorder;
        }
        if (this.y <= topBorder) {
            this.y = topBorder;
        }
        if (this.x >= rightBorder) {
            this.x = rightBorder;
        }
        if (this.y >= bottomBorder) {
            this.y = bottomBorder;
        }
    };
    this.hitApple = function () {
        var leftApple = apple.x;
        var topApple = apple.y;
        var rightApple = apple.x + apple.width;
        var bottomApple = apple.y + apple.height;
        if (this.x > rightApple || (this.x + this.width) < leftApple ||
            this.y > bottomApple || (this.y + this.height) < topApple) {
            return (false);
        }
        else {
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
var refresh = function () {
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
