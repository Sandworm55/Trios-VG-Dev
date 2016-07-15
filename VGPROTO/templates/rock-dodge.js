$(document).ready(function() {

	var numOfAsteroids = 50;

	init();//initilazes variales

	//Logic calls
	
	resizeCanvas();
	$(window).resize(resizeCanvas);

	spawnAsteroids(numOfAsteroids);

	//calls a looping function
	animate();
	
	// Function declarations
	
	function animate() 
	{
		
		clearCanvas();

		
		for (i = 0; i < asteroids.length; i++) 
		{
			var tempAsteroid = asteroids[i];

			tempAsteroid.x += tempAsteroid.vx;
			tempAsteroid.y += tempAsteroid.vy;

			leftRightWallCollision(tempAsteroid);
			topBottomWallCollision(tempAsteroid);
			checkAsteroidToAsteroidColision(tempAsteroid,i);

			drawAsteroid(tempAsteroid);

		}

		setTimeout(animate, 33);

	}

	// initilaze variales
	function init()
	{
		//Simple variales declarations
		canvas = $("#myCanvas");
		ctx = canvas.get(0).getContext("2d");
		asteroids = new Array();
			
		//Class declarations
		Asteroid = function(x, y, radius, vx, vy) 
		{
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.vx = vx;
			this.vy = vy;
		}
	}
	
	//switch color to black then fills canvas, switch to white after
	function clearCanvas()
	{
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas.width(), canvas.height());
		ctx.fillStyle = "white";
	}
	
	//resizes canvas to the size of the inside of the window
	function resizeCanvas() 
	{
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", ($(window).get(0).innerHeight)-52);//added the -52 to account for the nav menu, needed 2 more to get rid of the scroll

		ctx.fillRect(0, 0, canvas.width(), canvas.height());
	}

	function spawnAsteroids(num)
	{
		for (i = 0; i < num; i++) 
		{
			var radius = 5 + Math.random() * 10;
			var x = 20 + (Math.random() * (canvas.width() - 40));
			var y = 20 + (Math.random() * (canvas.height() - 40));
			var vx = Math.random() * 40 - 20;
			var vy = Math.random() * 40 - 20;

			asteroids.push(new Asteroid(x, y, radius, vx, vy));
		}
	}
	
	function drawAsteroid(tempAsteroidVar)
	{
		ctx.beginPath();
		ctx.arc(
			tempAsteroidVar.x,
			tempAsteroidVar.y,
			tempAsteroidVar.radius,
			0,
			Math.PI * 2,
			false);
		ctx.fill();
	}
	
	function checkAsteroidToAsteroidColision(tempAsteroidVar,iNum)
	{
		for (j = iNum + 1; j < asteroids.length; j++) 
		{
			var tempAsteroid2 = asteroids[j];

			var dx = tempAsteroid2.x - tempAsteroidVar.x;
			var dy = tempAsteroid2.y - tempAsteroidVar.y;
			var distance = Math.sqrt(dx*dx + dy*dy);

			if (distance < tempAsteroid2.radius + tempAsteroidVar.radius)
			{
				tempAsteroidVar.vx *= -1;
				tempAsteroidVar.vy *= -1;
				tempAsteroid2.vx *= -1;
				tempAsteroid2.vy *= -1;
			}
		}
	}
	
	function leftRightWallCollision(tempAsteroid)
	{
		if (tempAsteroid.x - tempAsteroid.radius < 0) 
		{
			tempAsteroid.x = tempAsteroid.radius;
			tempAsteroid.vx *= -1;
		} 
		else if (tempAsteroid.x + tempAsteroid.radius > canvas.width()) 
		{
			tempAsteroid.x = canvas.width() - tempAsteroid.radius;
			tempAsteroid.vx *= -1;
		}
	}
	
	function topBottomWallCollision(tempAsteroid)
	{
		if (tempAsteroid.y - tempAsteroid.radius < 0) 
		{
			tempAsteroid.y = tempAsteroid.radius;
			tempAsteroid.vy *= -1;
		} 
		else if (tempAsteroid.y + tempAsteroid.radius > canvas.height()) 
		{
			tempAsteroid.y = canvas.height() - tempAsteroid.radius;
			tempAsteroid.vy *= -1;
		}
	}
	
});