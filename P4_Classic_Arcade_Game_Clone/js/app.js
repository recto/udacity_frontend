var COL_W = 101;
var ROW_H = 83;
var HIT_W = COL_W - 20;
var HIT_H = ROW_H - 20;
var ENEMY_XMAX = 5 * COL_W;
var PLAYER_XMIN = 0;
var PLAYER_XMAX = 4 * COL_W;
var PLAYER_YMIN = -10;
var PLAYER_YMAX = 5 * ROW_H - 10;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0 - COL_W;
    this.y = (Math.floor(Math.random() * 3) + 1) * ROW_H - 22;
    this.speed = Math.floor(Math.random() * 10) + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += COL_W * dt * this.speed;
    if (this.x > ENEMY_XMAX) {
      this.x = 0;
      this.y = (Math.floor(Math.random() * 3) + 1) * ROW_H - 22;
      this.speed = Math.floor(Math.random() * 3) + 1;
    }
    if (this.resource) {
      this.rect = {x: this.x, y: this.y, width: HIT_W, height: HIT_H};
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    this.resource = Resources.get(this.sprite);
    ctx.drawImage(this.resource, this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 2 * COL_W;
    this.y = PLAYER_YMAX;
    this.rect = {x: this.x, y: this.y, width: HIT_W, height: HIT_H};
};

// Update the player's position, required method for game
Player.prototype.update = function() {
  if (this.resource) {
    this.rect = {x: this.x, y: this.y, width: HIT_W, height: HIT_H};
    allEnemies.forEach(function(enemy) {
      if (this.rect.x < enemy.rect.x + enemy.rect.width &&
          this.rect.x + this.rect.width > enemy.rect.x &&
          this.rect.y < enemy.rect.y + enemy.rect.height &&
          this.rect.height + this.rect.y > enemy.rect.y) {
            this.x = 2 * COL_W;
            this.y = PLAYER_YMAX;
          }
    }, this);
  }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    this.resource = Resources.get(this.sprite);
    ctx.drawImage(this.resource, this.x, this.y);
    if (this.y == PLAYER_YMIN) {
      this.x = 2 * COL_W;
      this.y = PLAYER_YMAX;
    }
};

// handleInput
Player.prototype.handleInput = function(keyCode) {
  if (keyCode == 'left' && this.x > PLAYER_XMIN) {
    this.x -= COL_W;
  }
  if (keyCode == 'right' && this.x < PLAYER_XMAX) {
    this.x += COL_W;
  }
  if (keyCode == 'up' && this.y > PLAYER_YMIN) {
    this.y -= ROW_H;
  }
  if (keyCode == 'down' && this.y < PLAYER_YMAX) {
    this.y += ROW_H;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy());
}
var player = new Player();

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
