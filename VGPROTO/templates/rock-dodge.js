$(document).ready(function() {
     var canvas = $("#myCanvas");
     var ctx = canvas.get(0).getContext("2d");

     var Asteroid = function(x, y, radius, vx, vy) {
         this.x = x;
         this.y = y;
         this.radius = radius;
         this.vx = vx;
         this.vy = vy;

     }

     function resizeCanvas() {
         canvas.attr("width", $(window).get(0).innerWidth);
         canvas.attr("height", $(window).get(0).innerHeight);

         ctx.fillRect(0, 0, canvas.width(), canvas.height());
     }

     resizeCanvas();
     $(window).resize(resizeCanvas);

     var asteroids = new Array();

     for (i = 0; i < 50; i++) {
         var radius = 5 + Math.random() * 10;
         var x = 20 + (Math.random() * (canvas.width() - 40));
         var y = 20 + (Math.random() * (canvas.height() - 40));
         var vx = Math.random() * 40 - 20;
         var vy = Math.random() * 40 - 20;

         asteroids.push(new Asteroid(x, y, radius, vx, vy));
     }

     function animate() {
         ctx.fillStyle = "black";
         ctx.fillRect(0, 0, canvas.width(), canvas.height());
         ctx.fillStyle = "white";

         for (i = 0; i < asteroids.length; i++) {
             var tempAsteroid = asteroids[i];

             tempAsteroid.x += tempAsteroid.vx;
             tempAsteroid.y += tempAsteroid.vy;

             if (tempAsteroid.x - tempAsteroid.radius < 0) {
                 tempAsteroid.x = tempAsteroid.radius;
                 tempAsteroid.vx *= -1;
             } else if (tempAsteroid.x + tempAsteroid.radius > canvas.width()) {
                 tempAsteroid.x = canvas.width() - tempAsteroid.radius;
                 tempAsteroid.vx *= -1;
             }

             if (tempAsteroid.y - tempAsteroid.radius < 0) {
                 tempAsteroid.y = tempAsteroid.radius;
                 tempAsteroid.vy *= -1;
             } else if (tempAsteroid.y + tempAsteroid.radius > canvas.height()) {
                 tempAsteroid.y = canvas.height() - tempAsteroid.radius;
                 tempAsteroid.vy *= -1;
             }

             for (j = i + 1; j < asteroids.length; j++) {
			 
                 var tempAsteroid2 = asteroids[j];
				 
                 var dx = tempAsteroid2.x - tempAsteroid.x;
                 var dy = tempAsteroid2.y - tempAsteroid.y;
                 var distance = Math.sqrt(dx*dx + dy*dy);
				 
				 if (distance < tempAsteroid2.radius + tempAsteroid.radius)
				 {
					tempAsteroid.vx *= -1;
					tempAsteroid.vy *= -1;
					tempAsteroid2.vx *= -1;
					tempAsteroid2.vy *= -1;
				 }
             }

             ctx.beginPath();
             ctx.arc(
                 tempAsteroid.x,
                 tempAsteroid.y,
                 tempAsteroid.radius,
                 0,
                 Math.PI * 2,
                 false);
             ctx.fill();
         }

         setTimeout(animate, 33);

     }

     animate();

 });