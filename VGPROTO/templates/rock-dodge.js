$(document).ready(function() {

	init();//initilazes variales

	//Logic calls
	
	resizeCanvas();
	$(window).resize(resizeCanvas);
	
	spawnAsteroids(50);

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
			drawButton(start);
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
		Asteroid = function(x, y, radius, vx, vy, mass) 
		{
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.vx = vx;
			this.vy = vy;
			this.mass = mass;
		}
		
		myButton = function(color)
		{
			this.x = 100;
			this.y = 50;
			this.width = 90;
			this.height = 45;
			this.rgb = color;
		}
		
		start = new myButton("green");
		stop = new myButton("red");
		
		// canvas.addEventListener('mousemove', function(evt) 
		// {
			// var mousePos = getMousePos(canvas, evt);
			// var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
			// writeMessage(canvas, message);
		// }, false);
	}
	
	function drawButton(buttonObj)
	{
		var oldColor = ctx.fillStyle;
		ctx.fillStyle = buttonObj.rgb;
		ctx.fillRect (buttonObj.x, buttonObj.y, buttonObj.width, buttonObj.height);
		
		ctx.fillStyle = oldColor;
	}
	
	function checkIfInsideButtonCoordinates(buttonObj, mouseX, mouseY)
	{
		if(((mouseX > buttonObj.x) && (mouseX < (buttonObj.x + buttonObj.width))) && ((mouseY > buttonObj.y) && (mouseY < (buttonObj.y + buttonObj.height))))
			return true;
		else
			return false;
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
			var mass = radius / 2;

			asteroids.push(new Asteroid(x, y, radius, vx, vy));
		}
	}
	

	
	function getMousePos(canvas, evt) 
	{
		// var rect = canvas.getBoundingClientRect();
		// return 
		// {
			// x: evt.clientX - rect.left,
			// y: evt.clientY - rect.top
		// };
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
				var angle = Math.atan2(dy,dx);
				var sine = Math.sin(angle);
				var cosine = Math.cos(angle);
				
				var x = 0;
				var y = 0;
				
				var x2 = dx * cosine + dy * sine;
				var y2 = dy * cosine - dx * sine;
				
				var vx = tempAsteroidVar.vx * cosine + tempAsteroidVar.vy * sine;
				var vy = tempAsteroidVar.vy * cosine - tempAsteroidVar.vx * sine;
				var vx2 = tempAsteroid2.vx * cosine + tempAsteroid2.vy * sine;
				var vy2 = tempAsteroid2.vy * cosine - tempAsteroid2.vx * sine;
			
				var vTotal = vx - vx2;
				vx = ((tempAsteroidVar.mass - tempAsteroid2.mass) * vx + 2 * tempAsteroid2.mass * vx2) / (tempAsteroidVar.mass + tempAsteroid2.mass);
				vx2 = vTotal + vx;
				
				x2 = x + (tempAsteroidVar.radius + tempAsteroid2.radius);
				
				tempAsteroidVar.x = tempAsteroidVar.x + (x * cosine - y * sine);
				tempAsteroidVar.y = tempAsteroidVar.y + (y * cosine + x * sine);
				tempAsteroid2.x = tempAsteroidVar.x + (x2 * cosine - y2 * sine);
				tempAsteroid2.y = tempAsteroidVar.y + (y2 * cosine + x2 * sine);
				
				tempAsteroidVar.vx = vx * cosine - vy * sine;
				tempAsteroidVar.vy = vy * cosine + vx * sine;
				tempAsteroid2.vx = vx2 * cosine - vy2 * sine;
				tempAsteroid2.vy = vy2 * cosine + vx2 * sine;
			}
		}
	}
	
	function leftRightWallCollision(tempAsteroidVar)
	{
		if (tempAsteroidVar.x - tempAsteroidVar.radius < 0) 
		{
			tempAsteroidVar.x = tempAsteroidVar.radius;
			tempAsteroidVar.vx *= -1;
		} 
		else if (tempAsteroidVar.x + tempAsteroidVar.radius > canvas.width()) 
		{
			tempAsteroidVar.x = canvas.width() - tempAsteroidVar.radius;
			tempAsteroidVar.vx *= -1;
		}
	}
	
	function topBottomWallCollision(tempAsteroidVar)
	{
		if (tempAsteroidVar.y - tempAsteroidVar.radius < 0) 
		{
			tempAsteroidVar.y = tempAsteroidVar.radius;
			tempAsteroidVar.vy *= -1;
		} 
		else if (tempAsteroidVar.y + tempAsteroidVar.radius > canvas.height()) 
		{
			tempAsteroidVar.y = canvas.height() - tempAsteroidVar.radius;
			tempAsteroidVar.vy *= -1;
		}
	}
	
});