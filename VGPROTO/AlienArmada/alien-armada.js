$(document).ready(function ()
{
	var canvas = document.querySelector("#alien-armada-canvas");
	var ctx = canvas.getContext("2d");
	
	var LOADING = 0;
	var PLAYING = 1;
	var GAMEEND = 2;
	var gameState = LOADING;
	
	var assetsToLoad = [];
	var assetsLoaded = 0;
	
	var image = new Image();
	image.src = "AlienArmada/resources/alienArmada.png";
	image.addEventListener("load", loadHandler);
	assetsToLoad.push(image);
	
	var sprites = [];
	
	var background = new SpriteObject();
	background.srcX = 0;
	background.srcY = 32;
	background.srcW = 480;
	background.srcH = 320;
	background.w = 480;
	background.h = 320;
	
	sprites.push(background);
	
	
	function loadHandler()
	{
		assetsLoaded += 1;
		
		if (assetsLoaded == assetsToLoad.length)
		{
			gameState = PLAYING;
			image.removeEventListener("load", loadHandler);
		}
	}
	
	function update() 
	{
		window.requestAnimationFrame(update);
		switch (gameState)
		{
			case LOADING:
				console.log("Loading...");
				break;
			case PLAYING:
				playGame();
				break;
			case GAMEEND:
				endGame();
				break;
			default:
				console.log("Welp, shit went pear shaped on us....");
		}
		
		render();
	}
	
	function playGame()
	{
		
	}
	
	function endGame()
	{
		
	}
	
	function render()
	{
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		for (var i = 0; i < sprites.length; i++)
		{
			var sprite = sprites[i];
			console.log(sprite);
			ctx.fillRect(0,0,50,50);
			ctx.drawImage(image,
				sprite.srcX, sprite.srcY,
				sprite.srcW, sprite.srcH,
				Math.floor(sprite.x),Math.floor(sprite.y),
				sprite.w,sprite.h
			);
		}
	}
	
	update();
});