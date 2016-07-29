$(document).ready(function ()
{
	var canvasHA = document.querySelector("#hedgehog-apocalypse canvas");
	var ctxHA = canvasHA.getContext("2d");

	var assetsToLoadHA = [];
	var assetsLoadedHA = 0;

	var spritesHA = [];

	var imageHA = new Image();
	imageHA.addEventListener("load", loadHandler);
	imageHA.src = "HedgehogApocalypse/Resources/hedgehogApocalypse.png";
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

	var HedgehogObject = function ()
	{
		this.sprite = new SpriteObject();
		this.NORMAL = [1, 0];
		this.SQUASHED = [2, 0];
		this.state = this.NORMAL;

		this.update = function ()
		{
			this.sprite.srcX = this.state[0] * this.sprite.srcW;
			this.sprite.srcY = this.state[1] * this.sprite.srcW;
		};

		this.speed = 1;
	};
	var map =
			[
				[7, 7, 8, 9, 7, 7, 7, 8, 9, 7, 7, 7, 8, 9, 7, 7],
				[8, 9, 7, 7, 4, 9, 7, 7, 7, 8, 9, 7, 7, 7, 8, 5],
				[4, 7, 7, 7, 7, 7, 8, 9, 7, 7, 7, 8, 9, 7, 4, 4],
				[7, 7, 4, 7, 7, 4, 4, 4, 4, 7, 7, 7, 7, 7, 7, 7],
				[8, 9, 4, 7, 7, 7, 7, 8, 9, 7, 7, 4, 8, 9, 7, 7],
				[7, 4, 4, 4, 7, 8, 9, 7, 7, 7, 4, 4, 7, 7, 4, 8],
				[9, 7, 8, 9, 7, 7, 7, 8, 9, 4, 7, 4, 9, 7, 7, 7],
				[7, 7, 7, 7, 7, 4, 4, 7, 7, 7, 7, 4, 4, 4, 4, 7],
				[8, 9, 7, 7, 7, 7, 7, 7, 7, 8, 9, 7, 7, 8, 9, 7],
				[7, 7, 4, 4, 4, 4, 7, 7, 4, 7, 7, 7, 7, 7, 7, 7],
				[7, 7, 7, 7, 7, 7, 7, 7, 7, 4, 7, 7, 7, 7, 7, 7],
				[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
			];

//The game objects map

	var gameObjects =
			[
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
			];

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

	var hog = new HedgehogObject();
	hog.sprite.x = 200;
	hog.sprite.y = 200;
	hog.sprite.w = 64;
	hog.sprite.h = 64;
	hog.sprite.srcW = 64;
	hog.sprite.srcH = 64;
	hog.update();
	spritesHA.push(hog.sprite);

	function render()
	{
		ctxHA.clearRect(0, 0, canvasHA.width, canvasHA.height);

		for ( var i = 0; i < spritesHA.length; i ++ )
		{
			var sprite = spritesHA[i];
			if ( sprite.visible )
			{
				ctxHA.drawImage(imageHA,
						sprite.srcX, sprite.srcY,
						sprite.srcW, sprite.srcH,
						Math.floor(sprite.x), Math.floor(sprite.y),
						sprite.w, sprite.h);
			}
		}
	}

	function playGame()
	{

	}

	update();
});