$(document).ready(function ()
{
	var canvasHA = document.querySelector("#hedgehog-apocalypse canvas");
	var ctxHA = canvasHA.getContext("2d");

	var assetsToLoadHA = [];
	var assetsLoadedHA = 0;


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
	{
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
	}

	var EMPTY = 0;
	var CAT = 1;
	var HEDGEHOG = 2;
	var BOX = 4;
	var DOOR = 5;

	var SIZE = 64;

	var cat = null;
	var door = null;
	var gameOverDisplay = null;
	var gameOverMessage = null;

	var spritesHA = [];
	var hedgehogs = [];
	var boxes = [];
	var messages = [];

	var hedgehogsSquashed = 0;

	var ROWS = map.length;
	var COLS = map[0].length;

	var tileSheetColumns = 3;

	function loadHandler()
	{
		assetsLoadedHA += 1;

		if (assetsLoadedHA == assetsToLoadHA.length)
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
				gameState = PLAYING;
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
		ctxHA.clearRect(0, 0, canvasHA.width, canvasHA.height);

		for (var i = 0; i < spritesHA.length; i ++)
		{
			var sprite = spritesHA[i];
			if (sprite.visible)
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
		for (var row = 0; row < ROWS; row ++)
		{
			for (var col = 0; col < COLS; col ++)
			{
				var currentTile = levelMap[row][col];

				if (currentTile != EMPTY)
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
							hedgehogs.push(hedgehog);
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
							boxes.push(box);
							break;
						case DOOR:
							door = new SpriteObject();
							door.srcX = tileSheetX;
							door.srcY = tileSheetY;
							door.srcW = 64;
							door.srcH = 64;
							door.x = col * SIZE;
							door.y = row * SIZE;
							door.w = 64;
							door.h = 64;
							spritesHA.push(door);
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

	function createOtherObjects()
	{
		gameOverDisplay = new SpriteObject();
		gameOverDisplay.srcX = 0;
		gameOverDisplay.srcY = 192;
		gameOverDisplay.srcW = 192;
		gameOverDisplay.srcH = 128;
		gameOverDisplay.w = 192;
		gameOverDisplay.h = 128;
		gameOverDisplay.x = canvasHA.width / 2 - gameOverDisplay.w / 2;
		gameOverDisplay.y = canvasHA.height / 2 - gameOverDisplay.h / 2;
		gameOverDisplay.visible = false;
		spritesHA.push(gameOverDisplay);

		gameOverMessage = new MessageObject();
		gameOverMessage.x = gameOverDisplay.x + 20;
		gameOverMessage.y = gameOverDisplay.y + 34;
		gameOverMessage.font = "bold 30px Helvetica";
		gameOverMessage.fillStyle = "black";
		gameOverMessage.text = "";
		gameOverMessage.visible = false;
		messages.push(gameOverMessage);
	}

	function playGame()
	{
		if (jumping && cat.isOnGround)
		{
			cat.vy += cat.jumpForce;
			cat.ax = - 0.2;
			cat.isOnGround = false;
			cat.friction = 1;
			
		}
		if (moveLeft && ! moveRight)
		{
			cat.ax = - 0.2;
			cat.friction = 1;
		}
		else if (! moveLeft && moveRight)
		{
			cat.ax = 0.2;
			cat.friction = 1;
		}

		if (! moveLeft && ! moveRight)
		{
			cat.ax = 0;
			cat.friction = 0.96;
		}
		
		for (var i = 0; i < boxes.length; i ++)
		{
			var collisionSide = blockRectangle(cat, boxes[i]);

			if (collisionSide === "bottom" && cat.vy >= 0)
			{
				cat.isOnGround = true;
				cat.vy = - cat.gravity;
			}
			else if (collisionSide === "top" & cat.vy <= 0)
				cat.vy = 0;
			else if (collisionSide === "right" & cat.vx <= 0)
				cat.vx = 0;
			else if (collisionSide === "left" & cat.vx <= 0)
				cat.vx = 0;

			if (collisionSide !== "bottom" & cat.vy > 0)
				cat.isOnGround = false;
		}
		
		if (cat.x < 0)
		{
			cat.vx = 0;
			cat.x = 0;
		}
		else if (cat.x + cat.w > canvasHA.width)
		{
			cat.vx = 0;
			cat.x = canvasHA.width - cat.w;
		}
		
		if (cat.y + cat.h > canvasHA.height)
		{
			cat.y = canvasHA.height - cat.h;
			cat.isOnGround = true;
			cat.vy = - cat.gravity;
		}
		console.log(cat.vy);


		for (var i = 0; i < hedgehogs.length; i ++)
		{
			var hedgehog = hedgehogs[i];

			if (hedgehog.state === hedgehog.NORMAL)
			{
				hedgehog.x += hedgehog.vx;
				hedgehog.y += hedgehog.vy;
			}

			if (Math.floor(hedgehog.x) % SIZE === 0 && Math.floor(hedgehog.y) % SIZE === 0)
			{
				var hedgehogColumn = Math.floor(hedgehog.x / SIZE);
				var hedgehogRow = Math.floor(hedgehog.y / SIZE);

				if (hedgehogRow < ROWS - 1)
				{
					var thingBelowLeft = map[hedgehogRow + 1][hedgehogColumn - 1];
					var thingBelowRight = map[hedgehogRow + 1][hedgehogColumn + 1];

					if (thingBelowLeft !== BOX || thingBelowRight !== BOX)
						hedgehog.vx *= - 1;
				}

				if (hedgehogColumn > 0)
				{
					var thingToTheLeft = map[hedgehogRow][hedgehogColumn - 1];
					if (thingToTheLeft === BOX)
						hedgehog.vx *= - 1;
				}

				if (hedgehogColumn < COLS - 1)
				{
					var thingToTheRight = map[hedgehogRow][hedgehogColumn + 1];
					if (thingToTheRight === BOX)
						hedgehog.vx *= - 1;
				}
			}
		}

		cat.vx += cat.ax;
		cat.vy += cat.gravity;
		if (cat.isOnGround)
			cat.vx *= cat.friction;
		cat.x += cat.vx;
		cat.y += cat.vy;
	}

	update();
});