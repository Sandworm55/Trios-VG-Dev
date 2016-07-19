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
		this.m = radius * (Math.random()*2);
		this.d = radius/this.m;
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
		
		this.draw = function()
		{
			ctx.fillStyle = "rgb(255,0,0)";
			ctx.beginPath();
			ctx.moveTo(player.x + player.halfWidth, player.y);
			ctx.lineTo(player.x - player.halfWidth, player.y - player.halfHeight);
			ctx.lineTo(player.x - player.halfWidth, player.y + player.halfHeight);
			ctx.closePath();
			ctx.fill();
		}
		
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
			var radius 	= getRadius();
			var y 		= Math.floor(Math.random()* canvasHeight);
			var x 		= canvasWidth + radius + Math.floor(Math.random() * canvasWidth);
			
			var vx = -5 - Math.random() * 5;
			
			asteroids.push(new Asteroid(x,y,radius,vx));
		}
		
		$(window).keydown(function(e)
		{
			var keyCode = e.keyCode;
			if (!playGame)
			{
				playGame = true;
				
				animate();
				timer();
			}
			
			if (keyCode == arrowRight)
					player.moveRight = true;

			if (keyCode == arrowUp)
					player.moveUp = true;
				
			if (keyCode == arrowDown)
					player.moveDown = true;

			
		});
		
		$(window).keyup(function(e)
		{
			var keyCode = e.keyCode;
			
			if (keyCode == arrowRight)
					player.moveRight = false;

			if (keyCode == arrowUp)
					player.moveUp = false;
				
			if (keyCode == arrowDown)
					player.moveDown = false;
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
			
			var dx = player.x - tempAsteroid.x;
			var dy = player.y - tempAsteroid.y;
			var distance = Math.sqrt(dx*dx+dy*dy);	
			
			if (player.halfWidth + tempAsteroid.radius > distance)
			{
				uiStats.hide();
				uiComplete.show();
				playGame = false;
				
				$(window).unbind("keydown");
				$(window).unbind("keyup");
				
				clearTimeout(scoreTimeout);
			}
			
			if (tempAsteroid.x + tempAsteroid.radius <= 0)
			{
				recycleAsteroid(tempAsteroid);
			}
			
			ctx.beginPath();
			ctx.arc(tempAsteroid.x,tempAsteroid.y,tempAsteroid.radius,0,Math.PI * 2, false);
			ctx.fill();
		}
		
		player.vy = 0;
		player.vx = 0;
		
		if (player.moveRight)
			player.vx = 3;
		else if(!player.moveRight)
			player.vx = -3;
		
		if (player.moveUp)
			player.vy = -3;
		else if (player.moveDown)
			player.vy = 3;
		
		player.x += player.vx;
		player.y += player.vy;
		
		
		if(player.x - player.halfWidth < 20)
			player.x = 20 + player.halfWidth;
		else if (player.x + player.halfWidth > canvasWidth - 20)
			player.x = canvasWidth - 20 - player.halfWidth;
			
		if (player.y - player.halfHeight < 20)
			player.y = 20 + player.halfHeight;
		else if ( player.y + player.halfHeight > canvasHeight - 20)
			player.y = canvasHeight - 20 - player.halfHeight;
		
		player.draw();
		
		while(asteroids.length < numAseroids)
		{
			var radius = getRadius();
			var x = getWidth();
			var y = getHeight();
			var vx= -5-(Math.random()*5);
			
			asteroids.push(new Asteroid(x,y,radius,vx));
		}
		
		if (playGame)
		{
			setTimeout(animate,33);
		}
	}
	
	function timer()
	{
		if (playGame)
		{
			scoreTimeout = setTimeout(function(){
				if (playGame)
				{
					uiScore.html(++score);
				
					for (i = 0;i<asteroids.length;i++)
						console.log(asteroids[i]);
					
					if (score % 5 == 0)
					{
						numAseroids += 5;
					}
					timer();
				}
			},1000);
		}
	}
	
	function recycleAsteroid(tempAsteroid)
	{
		tempAsteroid.radius = getRadius();
		tempAsteroid.x 		= canvasWidth + tempAsteroid.radius;
		tempAsteroid.y 		= getHeight();
		tempAsteroid.vx 	= -5 - Math.random() * 5;
	}
	
	function getRadius()
	{
		return 5 + Math.random() * 10;
	}
	
	function getWidth()
	{
		return Math.floor(Math.random()*canvasWidth)+canvasWidth+30;
	}
	
	function getHeight()
	{
		return Math.floor(Math.random()*canvasHeight);
	}
});