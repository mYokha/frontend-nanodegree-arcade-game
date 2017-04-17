// Here are some constants
var ENTITY_PIXEL_WIDTH = 101,
    ENTITY_PIXEL_HEIGHT = 171,
    ENTITY_CENTER = ENTITY_PIXEL_WIDTH / 2,
    CANVAS_WIDTH = 505,

//Player's starting position
    PLAYER_START_X = (CANVAS_WIDTH/2) - (ENTITY_CENTER),
    PLAYER_START_Y = (CANVAS_WIDTH)- (CANVAS_WIDTH/6) - (ENTITY_CENTER),

//Player's step values
    PLAYER_STEP_X = CANVAS_WIDTH/5, PLAYER_STEP_Y = CANVAS_WIDTH/6;


// Enemies our player must avoid
var Enemy = function (entry_x, entry_y) {
    this.x = entry_x - Math.random() * 500;
    this.y = entry_y;
    this.v = Math.random() * 500 + 100; //  the numbers were chosen
    //so it seems to look like it can cause some problems for a
    //player to reach the water
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt, playr) {
    this.checkCollision(playr);
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > CANVAS_WIDTH){
        this.x = -ENTITY_PIXEL_WIDTH;
    } else {
        this.x += this.v * dt;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Our player
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function () {
        this.x = PLAYER_START_X;
        this.y = PLAYER_START_Y;
}

Player.prototype.update = function (dt) {
    var valX = CANVAS_WIDTH/5/2 + ENTITY_CENTER;
    if (this.x >= CANVAS_WIDTH){
       this.x = 0;
    }
    if (this.x < 0){
       this.x = CANVAS_WIDTH - valX;
   }
    
    if (this.y > PLAYER_START_Y) {
            this.y = PLAYER_START_Y;
    }
    if (this.y < 30) {
        confirm("You've reached the water.\nClick 'Ok' button to restart!");
        this.reset();
    }
}

Player.prototype.handleInput = function (key) {
    switch(key){
        case 'up':
            this.y -= PLAYER_STEP_Y;
            break;
        case 'right':
            this.x += PLAYER_STEP_X; 
            break;
        case 'down':
            this.y += PLAYER_STEP_Y;
            break;
        case 'left':
            this.x -= PLAYER_STEP_X;
            break;   
    }
    return key;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(PLAYER_START_X, PLAYER_START_Y);

var enemy1 = new Enemy(ENTITY_PIXEL_WIDTH, 60),
    enemy2 = new Enemy(ENTITY_PIXEL_WIDTH, 143),
    enemy3 = new Enemy(ENTITY_PIXEL_WIDTH, 225);

var allEnemies = [
   enemy1,
   enemy2,
   enemy3
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Now it's time to check the collision!
Enemy.prototype.checkCollision = function(playr) {
    if (playr.x < this.x + 75 &&
        playr.x + 65 > this.x &&
        playr.y < this.y + 50 &&
        70 + playr.y > this.y) {
        console.log("Collision detected!");
        player.reset();
    }
}