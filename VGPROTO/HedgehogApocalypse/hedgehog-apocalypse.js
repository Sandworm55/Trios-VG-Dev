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

	var EMPTY = 0;
	var CAT = 1;
	var HEDGEHOG = 2;
	var BOX = 4;
	var DOOR = 5;
	var GRASS = 6;
	var SKY = 7;
	var CLOUD1 = 8;
	var CLOUD2 = 9;

	var SIZE = 64;

	var ROWS = map.length;
	var COLS = map[0].length;

	var tileSheetColumns = 3;

	function loadHandler()
	{
		assetsLoadedHA += 1;

		if ( assetsLoadedHA == assetsToLoadHA.length )
		{
			imageHA.removeEventListener("load", loadHandler);
			gameState = BUILD_MAP;

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
				buildMap(map);
				buildMap(gameObjects);
				break;
			case PLAYING:
				playGame();
				break;
			case GAME_OVER:
				// TODO GAME_OVER state
		}

		render();
	}

	var cat = null;

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

	function buildMap(levelMap)
	{
		for ( var row = 0; row < ROWS; row ++ )
		{
			for ( var col = 0; col < COLS; col ++ )
			{
				var currentTile = levelMap[row][col];

				if ( currentTile != EMPTY )
				{
					var tileSheetX = Math.floor((currentTile - 1) % tileSheetColumns) * SIZE;
					var tileSheetY = Math.floor((currentTile - 1) / tileSheetColumns) * SIZE;

					switch (currentTile)
					{
						case CAT:
							cat = new SpriteObject();
							cat.srcX = tileSheetX;
							cat.srcY = tileSheetY;
							cat.srcH = 64;
							cat.srcW = 64;
							cat.x = col * SIZE;
							cat.y = row * SIZE;
							cat.w = 64;
							cat.h = 64;
							spritesHA.push(cat);
							break;
						case HEDGEHOG:
							var hedgehog = new HedgehogObject();
							hedgehog.sprite.srcX = tileSheetX;
							hedgehog.sprite.srcY = tileSheetY;
							hedgehog.sprite.srcW = 64;
							hedgehog.sprite.srcH = 64;
							hedgehog.sprite.x = col * SIZE;
							hedgehog.sprite.y = row * SIZE;
							hedgehog.sprite.w = 64;
							hedgehog.sprite.h = 64;
							spritesHA.push(hedgehog.sprite);
							break;
						case BOX:
							var box = new SpriteObject();
							box.srcX = tileSheetX;
							box.srcY = tileSheetY;
							box.srcW = 64;
							box.srcH = 64;
							box.x = col * SIZE;
							box.y = row * SIZE;
							box.w = 64;
							box.h = 64;
							spritesHA.push(box);
							break;
						default:
							var sprite = new SpriteObject();
							sprite.srcX = tileSheetX;
							sprite.srcY = tileSheetY;
							sprite.srcW = 64;
							sprite.srcH = 64;
							sprite.x = col * SIZE;
							sprite.y = row * SIZE;
							sprite.w = 64;
							sprite.h = 64;
							spritesHA.push(sprite);
							break;
						

					}
				}
			}
		}
	}

	function playGame()
	{

	}

	update();
});