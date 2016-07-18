$(document).ready(function(){
	
	var canvas 		= $("#asteroidAvoid");
	var ctx 		= canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	// Game interface
	var ui 			= $("#gameUI");
	var uiIntro 	= $("#gameIntro");
	var uiStats 	= $("#gameStats");
	var uiComplete 	= $("#gameComplete");
	var uiPlay 		= $("gamePlay");
	var btReset 	= $(".gameReset");
	var btScore 	= $(".gameScore");
	
	// Game settings
	var playGame;	// boolean flag
	var asteroids;	// array that holds all the asteroids
	var numAseroids;// number of active asteroids
	var player;		// the player spaceship
	var score;		// the current score
	var scoreTimeout;//the timer object to increment score

	// Keyboard keycodes
	var arrowUp 	= 38;
	var arrowRight 	= 39;
	var arrowDown 	= 40;
	
	// Asteroid object
	var Asteroid = function(x,y,radius,vx)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.vx = vx;
	}
	
	// Player object
	var Player = function(x,y)
	{
		this.x = x;
		this.y = y;
		this.w = 24;
		this.h = 24;
		
		this.halfWidth = this.w / 2;
		this.halfHeight = this.h / 2;
		
		this.vx = 0;
		this.vy = 0;
		
		this.moveRight = false;
		this.moveUp = false;
		this.moveDown = false;
		
		this.flameLength = 20;
		
	}
});