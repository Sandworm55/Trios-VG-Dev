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
	
	//Constants
	var verticalSpeed	= 7;
	var horizontalSpeed	= 3;
	
	
	// Game settings
	var playGame;	// boolean flag
	var asteroids;	// array that holds all the asteroids
	var numAsteroids;// number of active asteroids
	var player;		// the player spaceship
	var score;		// the current score
	var scoreTimeout;//the timer object to increment score

	//Game sounds
	var soundBackground = $("#gameSoundBackground").get(0);
	var soundDeath 		= $("#gameSoundDeath").get(0);
	var soundThrust 	= $("#gameSoundThrust").get(0);
	
	// Keyboard keycodes
	var arrowUp 	= 38;
	var arrowRight 	= 39;
	var arrowDown 	= 40;
	
	/**
         * Asteroid object with cords, radius, and a velocity along x
         * @param {int} x x cords
         * @param {int} y y cords
         * @param {int} radius radius of asteroid
         * @param {int} vx velocity of asteroid
         * @returns {asteroid-avoid_L1.Asteroid}
         */
	var Asteroid = function(x,y,radius,vx)
	{
		this.x 		= x;
		this.y 		= y;
		this.radius = radius;
		this.vx 	= vx;
		this.m 		= radius * (Math.random()*2);
		this.d 		= radius/this.m;
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
		
		this.flameLength = 25;
		this.flameGrow = false;
		
		this.draw = function()
		{
			drawFlame("red",this.flameLength);
			drawFlame("orange",(this.flameLength-(this.flameLength/4)));
			drawFlame("yellow",(this.flameLength-(this.flameLength/2)));
			
			flamePulse();
			
			ctx.fillStyle = "rgb(255,0,0)";
			ctx.beginPath();
			ctx.moveTo(player.x + player.halfWidth, player.y);
			ctx.lineTo(player.x - player.halfWidth, player.y - player.halfHeight);
			ctx.lineTo(player.x - player.halfWidth, player.y + player.halfHeight);
			ctx.closePath();
			ctx.fill();
		}
		
	}
	
	//pulses the size of the flame
	function flamePulse()
	{
		if (player.flameLength == 25)
			this.flameGrow = false;
		else if (player.flameLength == 20)
			this.flameGrow = true;
			
		if (this.flameGrow)
			player.flameLength += .5;
		else
			player.flameLength -= .5;
	}
	
	//Draws flame based on the color and length provided
	function drawFlame(color,length)
	{
		if (player.moveRight)
			{
				ctx.save();
				ctx.translate(player.x,player.y);
				
				
				
				ctx.fillStyle = color;
				ctx.beginPath();
				ctx.moveTo(-player.halfWidth - length, 0);
				ctx.lineTo(-player.halfWidth, -(length/4));
				ctx.lineTo(-player.halfWidth, length/4);
				ctx.closePath();
				ctx.fill();
				
				ctx.restore();
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
		
		uiReset.click(function(e)
		{
			e.preventDefault();
			uiComplete.hide();
			$(window).unbind("keyup");
			$(window).unbind("keydown");
			clearTimeout(scoreTimeout);
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
		numAsteroids = 10;
		score 		= 0;
		
		player 		= new Player(150,canvasHeight / 2);
		
		for (var i = 0; i < numAsteroids; i++)
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
				
				soundBackground.currentTime = 0;
				soundDeath.currentTime = 0;
				soundThrust.currentTime = 0;
				soundBackground.play();
			}
			
			if (keyCode == arrowRight)
			{
				player.moveRight = true;
				
				if (soundThrust.paused)
				{
					soundThrust.currentTime = 0;
					soundThrust.play();
				}
			}
			if (keyCode == arrowUp)
				player.moveUp = true;
				
			if (keyCode == arrowDown)
				player.moveDown = true;

			
		});
		
		$(window).keyup(function(e)
		{
			var keyCode = e.keyCode;
			
			if (keyCode == arrowRight)
			{
				player.moveRight = false;
				soundThrust.pause();
			}
			
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
				
				soundBackground.pause();
				soundDeath.play();
				soundThrust.pause();
				
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
			player.vx = horizontalSpeed;
			
		else if(!player.moveRight)
			player.vx = -horizontalSpeed;
		
		if (player.moveUp)
			player.vy = -verticalSpeed;
		else if (player.moveDown)
			player.vy = verticalSpeed;
		
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
		
		while(asteroids.length < numAsteroids)
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
					
					if (score % 5 == 0)
					{
						numAsteroids += 5;
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