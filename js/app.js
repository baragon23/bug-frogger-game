// Enemies our player must avoid
var Enemy = function(x, y) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';

	this.x = x;
	this.y = y;
	this.width = 75;
	this.height = 50;
	this.speed = Math.floor(Math.random() * 600 + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	this.x += this.speed * dt;

	// enemy made it to the edge of the screen so they get reset back to beginning
	if (this.x > 510) {
		this.x = -100;
	}

	// collision algo
	if ((this.y + this.height) > player.y &&
		this.y < (player.y + player.height) &&
		(this.x + this.width) > player.x &&
		this.x < (player.x + player.width)) {
		player.reset();
	}


	// console.log('Bug y: ' + this.y); // 60 140 220
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
	this.sprite = 'images/char-boy.png';
	this.x = x;
	this.y = y;
	this.width = 75;
	this.height = 50;
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function(dt) {
	// player made it to the top and won
	if (this.y < 50) {
		this.x = 200;
		this.y = 370;
	}
};

Player.prototype.handleInput = function(keyCode) {
	console.log('x: ' + this.x + ' y: ' + this.y);
	switch(keyCode) {
		case 'left':
			if (this.x !== 0) {
				this.x -= 100;
			}
			break;
		case 'up':
			this.y -= 80;
			break;
		case 'right':
			if (this.x !== 400) {
				this.x += 100;
			}
			break;
		case 'down':
			if (this.y !== 370) {
				this.y += 80;
			}
			break;
		default:
			break;
	}
}

Player.prototype.reset = function() {
	this.x = 200;
	this.y = 370;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(-100, 60), new Enemy(-100, 140), new Enemy(-100, 220)];
var player = new Player(200, 370);


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
