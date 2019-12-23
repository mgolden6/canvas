//jshint esversion: 6

let apple;
let snake;

// start game
function startGame() {
    gameArea.start();
    apple = new component(40, 40, 5, 5, "red");
    snake = new component(20, 20, 10, 10, "lime");
}

let gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
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
function component(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y -= this.speedY;
        this.hitBorder();
        this.hitApple();
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
            return(false);
        } else {
            // * move apple
            // * update score
            alert("hit apple");
        }
    };
    this.moveApple = function () {
        
    };
}

// create refresh
function refresh() {
    gameArea.clear();
    if (gameArea.keys && gameArea.keys[37]) {
        snake.speedX = -1;
        snake.speedY = 0;
    }
    if (gameArea.keys && gameArea.keys[38]) {
        snake.speedY = 1;
        snake.speedX = 0;
    }
    if (gameArea.keys && gameArea.keys[39]) {
        snake.speedX = 1;
        snake.speedY = 0;
    }
    if (gameArea.keys && gameArea.keys[40]) {
        snake.speedY = -1;
        snake.speedX = 0;
    }
    snake.newPos();
    snake.update();
    apple.update();
}