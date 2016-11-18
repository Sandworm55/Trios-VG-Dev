$(document).ready(function ()
{

	var asteroids = new Array();
	init();//initilazes variales

	//Logic calls

	resizeCanvas();
	$(window).resize(resizeCanvas);

	spawnAsteroids(15);

	//calls a looping function
	animate();

	// Function declarations

	function animate()
	{

		clearCanvas();


		for (i = 0; i < asteroids.length; i ++)
		{
			var tempAsteroid = asteroids[i];
			
			tempAsteroid.vy += .5;
			tempAsteroid.x += tempAsteroid.vx;
			tempAsteroid.y += tempAsteroid.vy;

			leftRightWallCollision(tempAsteroid);
			topBottomWallCollision(tempAsteroid);
			checkAsteroidToAsteroidColision(tempAsteroid, i);
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


		//Class declarations
		Asteroid = function (x, y, radius, vx, vy, mass,num)
		{
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.vx = vx;
			this.vy = vy;
			this.mass = mass;
			this.num = num;
		};

		myButton = function (color)
		{
			this.x = 100;
			this.y = 50;
			this.width = 90;
			this.height = 45;
			this.rgb = color;
		};
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
		canvas.attr("width", ($(window).get(0).innerWidth) - 20);
		canvas.attr("height", ($(window).get(0).innerHeight) - 20);//added the -52 to account for the nav menu, needed 2 more to get rid of the scroll

		ctx.fillRect(0, 0, canvas.width(), canvas.height());
	}

	function spawnAsteroids(num)
	{
		for (i = 0; i < num; i ++)
		{
			var radius = 5 + Math.random() * 10;
			var x = 20 + (Math.random() * (canvas.width() - 40));
			var y = 20 + (Math.random() * (canvas.height() - 40));
			var vx = Math.random() * 20 - 5;
			var vy = Math.random() * 20 - 5;
			var mass = radius / 2;

			asteroids.push(new Asteroid(x, y, radius, vx, vy,mass,i));
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

	function checkAsteroidToAsteroidColision(tempAsteroidVar, iNum)
	{
		for (j = iNum + 1; j < asteroids.length; j ++)
		{
			var tempAsteroid2 = asteroids[j];
			var dx = tempAsteroid2.x - tempAsteroidVar.x;
			var dy = tempAsteroid2.y - tempAsteroidVar.y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			if (distance < tempAsteroid2.radius + tempAsteroidVar.radius)
			{
				var vx = (tempAsteroidVar.vx *
						(tempAsteroidVar.mass-tempAsteroid2.mass) +
						(2 * tempAsteroid2.mass * tempAsteroid2.vx)) /
						(tempAsteroidVar.mass + tempAsteroid2.mass);

				var vy = (tempAsteroidVar.vy *
						(tempAsteroidVar.mass - tempAsteroid2.mass) +
						(2 * tempAsteroid2.mass * tempAsteroid2.vy)) /
						(tempAsteroidVar.mass + tempAsteroid2.mass);

				var vx2 = (tempAsteroid2.vx *
						(tempAsteroid2.mass - tempAsteroidVar.mass) +
						(2 * tempAsteroidVar.mass * tempAsteroidVar.vx)) /
						(tempAsteroidVar.mass + tempAsteroid2.mass);

				var vy2 = (tempAsteroid2.vy *
						(tempAsteroid2.mass - tempAsteroidVar.mass) +
						(2 * tempAsteroidVar.mass * tempAsteroidVar.vy)) /
						(tempAsteroidVar.mass + tempAsteroid2.mass);

				tempAsteroidVar.vx = vx;
				tempAsteroidVar.vy = vy;
				tempAsteroid2.vx = vx2;
				tempAsteroid2.vy = vy2;

			}
		}
	}

	function leftRightWallCollision(tempAsteroidVar)
	{
		if (tempAsteroidVar.x - tempAsteroidVar.radius < 0)
		{
			tempAsteroidVar.x = tempAsteroidVar.radius;
			tempAsteroidVar.vx *= - 1;
		}
		else if (tempAsteroidVar.x + tempAsteroidVar.radius > canvas.width())
		{
			tempAsteroidVar.x = canvas.width() - tempAsteroidVar.radius;
			tempAsteroidVar.vx *= - 1;
		}
	}

	function topBottomWallCollision(tempAsteroidVar)
	{
		if (tempAsteroidVar.y - tempAsteroidVar.radius < 0)
		{
			tempAsteroidVar.y = tempAsteroidVar.radius;
			tempAsteroidVar.vy *= - 1;
		}
		else if (tempAsteroidVar.y + tempAsteroidVar.radius > canvas.height())
		{
			tempAsteroidVar.y = canvas.height() - tempAsteroidVar.radius;
			tempAsteroidVar.vy *= - 1;
		}
	}
}
);