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
	var uiPlay 		= $("#gamePlay");
	var uiReset 	= $(".gameReset");
	var uiScore 	= $(".gameScore");
	
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
		
		this.halfWidth 	= this.w / 2;
		this.halfHeight = this.h / 2;
		
		this.vx = 0;
		this.vy = 0;
		
		this.moveRight 	= false;
		this.moveUp 	= false;
		this.moveDown 	= false;
		
		this.flameLength = 20;
		
	}
	
	init();
	
	function init()
	{
		uiStats.hide();
		uiComplete.hide();
		
		uiPlay.click(function(e)
		{
			e.preventDefault();
			uiIntro.hide();
			startGame();
		});
	}
	
	function startGame()
	{
		// reset game settings to initial values
		uiScore.html("0");
		uiStats.show();
		
		playGame 	= false;
		asteroids 	= new Array();
		numAseroids = 10;
		score 		= 0;
		
		player 		= new Player(150,canvasHeight / 2);
		
		for (var i = 0; i < numAseroids; i++)
		{
			var radius 	= 5 + Math.random() * 10;
			var y 		= Math.floor(Math.random()* canvasHeight);
			var x 		= canvasWidth + radius + Math.floor(Math.random() * canvasWidth);
			
			var vx = -5 - Math.random() * 5;
			
			asteroids.push(new Asteroid(x,y,radius,vx));
		}
		
		$(window).keydown(function(e)
		{
			var keyCode = e.keyCodel
			
			if (playGame == false)
			{
				playGame = true;
				
				animate();
				//timer();
			}
		});
		
		animate();
	}
	
	function animate()
	{
		ctx.clearRect(0,0,canvasWidth,canvasHeight);
		
		ctx.fillStyle = "white";
		for (var i = 0; i < asteroids.length; i++)
		{
			var tempAsteroid = asteroids[i];
			
			tempAsteroid.x += tempAsteroid.vx;
			
			ctx.beginPath();
			ctx.arc(tempAsteroid.x,tempAsteroid.y,tempAsteroid.radius,0,Math.PI * 2, false)
			ctx.fill();
		}
		
		if (playGame == true)
		{
			setTimeout(animate,33);
		}
	}
});