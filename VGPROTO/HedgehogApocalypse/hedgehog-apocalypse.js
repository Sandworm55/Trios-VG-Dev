$(document).ready(function ()
{

	var canvasHA = document.querySelector("#hedgehog-apocalypse canvas");
	var ctxHA = canvasHA.getContext("2d");

	var assetsToLoadHA = [];
	var assetsLoadedHA = 0;

	var spritesHA = [];

	var imageHA = new Image();
	imageHA.addEventListener("load", loadHandler);
	imageHA.src = "hedgehogApocalypse.png";
	assetsToLoadHA.push(imageHA);

	//Game States
	var LOADING = 0;
	var BUILD_MAP = 1;
	var PLAYING = 2;
	var GAME_OVER = 3;
	var gameState = LOADING;

	// Keycodes
	var LEFT = 37;
	var RIGHT = 39;
	var SPACE = 32;

	//Direction flags
	var moveRight = false;
	var moveLeft = false;
	var jumping = false;

	function loadHandler()
	{
		assetsLoadedHA += 1;

		if ( assetsLoadedHA == assetsToLoadHA.length )
		{
			imageHA.removeEventListener("load", loadHandler);
			gameState = PLAYING;

			window.addEventListener("keydown", function (e)
			{
				switch (e.keyCode)
				{
					case LEFT:
						moveLeft = true;
						break;
					case RIGHT:
						moveRight = true;
						break;
					case SPACE:
						jumping = true;
						break;
				}
			});
			window.addEventListener("keyup", function (e)
			{
				switch (e.keyCode)
				{
					case LEFT:
						moveLeft = false;
						break;
					case RIGHT:
						moveRight = false;
						break;
					case SPACE:
						jumping = false;
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
			case BUILD_MAP:
				// TODO BUILD_MAP state
				break;
			case PLAYING:
				playGame();
				break;
			case GAME_OVER:
				// TODO GAME_OVER state
		}

		render();
	}

	function render()
	{
		ctxHA.clearRect(0,0,canvasHA.width,canvasHA.height);
		
		for (var i = 0;i<spritesHA.length; i++)
		{
			var sprite = spritesHA[i];
			
			if (sprite.visible)
			{
				ctxHA.drawImage(imageHA,
				sprite.srcX,sprite.srcY,
				sprite.srcW,sprite.srcH,
				Math.floor(sprite.x),Math.floor(sprite.y),
				sprite.w,sprite.h);
			}
		}
	}
});