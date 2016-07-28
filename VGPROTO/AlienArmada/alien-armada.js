$(document).ready(function ()
{
	var canvas = document.querySelector("#alien-armada-canvas");
	var ctx = canvas.getContext("2d");





	var AlienObject = function ()
	{
		this.sprite = new SpriteObject();
		this.NORMAL = 1;
		this.EXPLODED = 2;
		this.state = this.NORMAL;

		this.update = function ()
		{
			this.sprite.srcX = this.state * this.sprite.srcW;
		};
	};

	// Gamestates
	var LOADING = 0;
	var MENU	= 1;
	var PLAYING = 2;
	var GAMEEND = 3;
	var gameState = LOADING;

	//Keycodes
	var LEFT = 37;
	var RIGHT = 39;
	var SPACE = 32;

	//Player states
	var moveLeft = false;
	var moveRight = false;
	var shoot = false;
	var spacePressed = false;

	// Alien spawn timing
	var alienFrequency = 100;
	var alienTimer = 0;

	var score = 20;

	var assetsToLoad = [];
	var assetsLoaded = 0;

	var image = new Image();
	image.src = "AlienArmada/resources/alienArmada.png";
	image.addEventListener("load", loadHandler);
	assetsToLoad.push(image);

	var music = document.querySelector("#alien-armada #music");
	music.addEventListener("canplaythrough", loadHandler);
	music.load();
	assetsToLoad.push(music);

	var explosion = document.querySelector("#alien-armada #explosion");
	explosion.addEventListener("canplaythrough", loadHandler);
	explosion.load();
	assetsToLoad.push(explosion);

	var shooting = document.querySelector("#alien-armada #shoot");
	shooting.addEventListener("canplaythrough", loadHandler);
	shooting.load();
	assetsToLoad.push(shooting);



	// Data structures
	var sprites = [];
	var aleins = [];
	var missiles = [];
	var messages = [];

	var scoreStartPos = 440;

	var background = new SpriteObject();
		background.srcX = 0;
		background.srcY = 32;
		background.srcW = 480;
		background.srcH = 320;
		background.w = 480;
		background.h = 320;
		sprites.push(background);

	var title = new SpriteObject();
		title.srcY = 352;
		title.srcW = 275;
		title.srcH = 145;
		title.x = 106;
		title.y = 50;
		title.w = 275;
		title.h = 145;
		sprites.push(title);

	var playButton = new SpriteObject();
		playButton.srcX = 275;
		playButton.srcY = 352;
		playButton.srcW = 108;
		playButton.srcH = 54;
		playButton.x = 187;
		playButton.y = 213;
		playButton.w = 108;
		playButton.h = 54;
		sprites.push(playButton);

	var cannon = new SpriteObject();
		cannon.x = canvas.width / 2 - cannon.halfWidth();
		cannon.y = 280;
		cannon.visible = false;
		sprites.push(cannon);

	var scoreMessage = new MessageObject();
		scoreMessage.font = "normal bold 30px emulogic";
		scoreMessage.fontStyle = "green";
		scoreMessage.x = scoreStartPos;
		scoreMessage.y = 40;
		scoreMessage.visible = false;
		scoreMessage.text = score;
		messages.push(scoreMessage);

	var gameOverMessage = new MessageObject();
		gameOverMessage.font = "normal bold 20px emulogic";
		gameOverMessage.fontStyle = "green";
		gameOverMessage.x = 20;
		gameOverMessage.y = 120;
		gameOverMessage.visible = false;
		gameOverMessage.text = "Good job, were all dead...";
		messages.push(gameOverMessage);

	function loadHandler()
	{
		assetsLoaded += 1;

		if ( assetsLoaded == assetsToLoad.length )
		{
			gameState = MENU;
			image.removeEventListener("load", loadHandler);
			music.removeEventListener("canplaythrough", loadHandler);
			shooting.removeEventListener("canplaythrough", loadHandler);
			explosion.removeEventListener("canplaythrough", loadHandler);

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
						if ( ! spacePressed && score > 0 )
						{
							shoot = true;
							spacePressed = true;
						}
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
						shoot = false;
						spacePressed = false;
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
				music.volume = 0.3;
				music.play();
				break;
			case MENU:
				showMenu();
				break;
			case PLAYING:
				playGame();
				break;
			case GAMEEND:
				music.pause();
				endGame();
				break;
			default:
				console.log("Welp, shit went pear shaped on us....");
		}

		render();
	}
	
	function showMenu()
	{
		
	}
	
	function playGame()
	{
		if ( moveLeft && ! moveRight )
		{
			cannon.vx = - 8;
		}
		if ( ! moveLeft && moveRight )
		{
			cannon.vx = 8;
		}
		if ( ! moveLeft && ! moveRight )
		{
			cannon.vx = 0;
		}

		cannon.x = Math.max(0, Math.min(cannon.x + cannon.vx, canvas.width - cannon.w));

		if ( shoot )
		{
			fireMissile();
			shoot = false;
		}

		for ( var i = 0; i < missiles.length; i ++ )
		{
			var missile = missiles[i];
			missile.vy = - 10;
			missile.y += missile.vy;
		}

		alienTimer += 1;
		if ( alienTimer >= alienFrequency )
		{
			makeAlien();
			alienTimer = 0;
			alienFrequency = (alienFrequency > 40 ? alienFrequency -= 1 : 40);
		}

		for ( var i = 0; i < aleins.length; i ++ )
		{
			var alien = aleins[i];

			for ( var j = 0; j < missiles.length; j ++ )
			{
				var missile = missiles[j];

				if ( alien.state == alien.NORMAL )
				{
					if ( hitTestRectangle(missile, alien.sprite) )
					{
						destroyAlien(alien);
						explosion.currentTime = 0;
						explosion.play();

						score += 3;

						removeObject(missile, sprites);
						removeObject(missile, missiles);
						j -= 1;
					}
				}
			}

			if ( alien.state == alien.NORMAL )
				alien.sprite.y += alien.sprite.vy;

			if ( alien.sprite.y > canvas.height )
			{
				gameState = GAMEEND;
			}
		}

	}

	function endGame()
	{
		gameOverMessage.visible = true;
	}

	function render()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for ( var i = 0; i < sprites.length; i ++ )
		{
			var sprite = sprites[i];
			if (sprite.visible)
			{
				ctx.drawImage(image,
						sprite.srcX, sprite.srcY,
						sprite.srcW, sprite.srcH,
						Math.floor(sprite.x), Math.floor(sprite.y),
						sprite.w, sprite.h
				);
			}
		}

		scoreMessage.x = scoreStartPos - ((score.toString().length - 1) * 30);
		scoreMessage.text = score;

		for ( var i = 0; i < messages.length; i ++ )
		{
			var message = messages[i];

			if ( message.visible )
			{
				ctx.font = message.font;
				ctx.fillStyle = message.fontStyle;
				ctx.textBaseLine = message.textBaseLine;

				ctx.fillText(message.text, message.x, message.y);
			}
		}
	}

	function makeAlien()
	{
		var alien = new AlienObject();
		alien.sprite.srcX = 32;
		alien.sprite.y = - alien.sprite.h;
		alien.sprite.x = getRandom(0, 14) * alien.sprite.w;

		alien.sprite.vy = 1;
		sprites.push(alien.sprite);
		aleins.push(alien);
	}

	function fireMissile()
	{
		shooting.currentTime = 0;
		shooting.play();
		score -= 1;

		var missile = new SpriteObject();
		missile.srcX = 96;
		missile.srcH = 16;
		missile.srcW = 16;
		missile.w = 16;
		missile.h = 16;

		missile.x = cannon.center().x - missile.halfWidth();
		missile.y = cannon.y - missile.h;

		sprites.push(missile);
		missiles.push(missile);
	}

	function destroyAlien(alien)
	{
		alien.state = alien.EXPLODED;
		alien.update();
		setTimeout(function ()
		{
			removeObject(alien.sprite, sprites);
			removeObject(alien, aleins);
		}, 1000);
	}

	update();
});