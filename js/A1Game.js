//--
// A1Game2
// Represents a second Game to demonstrate how the engine can run "any" game
// Author: arya-s
define(["A1Vec2", "A1util"], function(A1Vec2, A1util) {
	function A1Game(resources) {
		this.resources = resources;
	}

	//Hooks the core to this game, the core is used to render to the canvas
	A1Game.prototype.hook = function(core) {
		this.core = core;
	};

	A1Game.prototype.init = function() {
		//In this game we just create a player and have it move around on the canvas.
		//the player is just defined by its starting position and the image representing it
		this.player = {
			node: new A1Vec2(10, 10),
			img: this.resources.getTile('player', 0)
		};
	};

	A1Game.prototype.update = function(dt) {
		//Move the player around using WASD
		if (keydown.left || keydown.a) {
			this.player.node.x -= 100 * dt;
		}
		if (keydown.right || keydown.d) {
			this.player.node.x += 100 * dt;
		}
		if (keydown.up || keydown.w) {
			this.player.node.y -= 100 * dt;
		}
		if (keydown.down || keydown.s) {
			this.player.node.y += 100 * dt;
		}

		//Clamp the values to make sure the player stays within the canvas, 32 is the player's image size
		this.player.node.x = A1util.clamp(this.player.node.x, 0, this.core.canvas.dimensions.width-32);
		this.player.node.y = A1util.clamp(this.player.node.y, 0, this.core.canvas.dimensions.height-32);
	};

	A1Game.prototype.draw = function() {
		//Clear the canvas
		this.core.clearCanvas();
		//Draw the player
		this.core.drawImage(this.player.img, this.player.node.x, this.player.node.y);
	};

	return A1Game;
});