$(document).ready(function ()
{
	var canvas = document.querySelector("#alien-armada-canvas");
	var ctx = canvas.getContext("2d");
	
	var LOADING = 0;
	var PLAYING = 1;
	var GAMEEND = 2;
	var gameState = LOADING;
	
	//Keycodes
	var LEFT	= 37;
	var RIGHT	= 39;
	var SPACE	= 32;
	
	//Player states
	var moveLeft	= false;
	var moveRight	= false;
	var shoot		= false
	
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
	
	var cannon = new SpriteObject();
	cannon.x = canvas.width / 2 - cannon.halfWidth();
	cannon.y = 280;
	sprites.push(cannon);
	
	
	function loadHandler()
	{
		assetsLoaded += 1;
		
		if (assetsLoaded == assetsToLoad.length)
		{
			gameState = PLAYING;
			image.removeEventListener("load", loadHandler);
			
			window.addEventListener("keydown", function (e){
				switch (e.keyCode){
					case LEFT:
						moveLeft = true;
						break;
					case RIGHT:
						moveRight = true;
						break;
					case SPACE:
						shoot = true;
						break;
				}
			});
			window.addEventListener("keyup", function (e){
				switch (e.keyCode){
					case LEFT:
						moveLeft = false;
						break;
					case RIGHT:
						moveRight = false;
						break;
					case SPACE:
						shoot = false;
						break;
				}
			});
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