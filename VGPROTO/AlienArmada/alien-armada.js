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
		
		this.update = function()
		{
			this.sprite.srcX = this.state * this.sprite.srcW;
		};
	};

	// Gamestates
	var LOADING = 0;
	var PLAYING = 1;
	var GAMEEND = 2;
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
	
	var score = 0;

	var assetsToLoad = [];
	var assetsLoaded = 0;

	var image = new Image();
	image.src = "AlienArmada/resources/alienArmada.png";
	image.addEventListener("load", loadHandler);
	assetsToLoad.push(image);

	// Data structures
	var sprites = [];
	var aleins = [];
	var missiles = [];

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

		if ( assetsLoaded == assetsToLoad.length )
		{
			gameState = PLAYING;
			image.removeEventListener("load", loadHandler);

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
						if (!spacePressed)
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
				break;
			case PLAYING:
				console.log("Playing");
				playGame();
				break;
			case GAMEEND:
				console.log("Ending");
				endGame();
				break;
			default:
				console.log("Welp, shit went pear shaped on us....");
		}

		render();
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
		
		if (shoot)
		{
			fireMissile();
			shoot = false;
		}
		
		for (var i = 0; i < missiles.length; i++)
		{
			var missile = missiles[i];
			missile.vy = -10;
			missile.y += missile.vy;
		}
		
		alienTimer += 1;
		if (alienTimer >= alienFrequency)
		{
			makeAlien();
			alienTimer = 0;
			alienFrequency = (alienFrequency > 40 ? alienFrequency -= 1 : 40 );
		}
		
		for (var i = 0; i < aleins.length; i++)
		{
			var alien = aleins[i];
			
			for (var j = 0; j < missiles.length; j++)
			{
				var missile = missiles[j];
				
				if (alien.state == alien.NORMAL)
				{
					if (hitTestRectangle(missile, alien.sprite))
					{
						destroyAlien(alien);

						score += 1;

						removeObject(missile,sprites);
						removeObject(missile,missiles);
						j -= 1;
					}
				}
			}
			
			if (alien.state == alien.NORMAL)
				alien.sprite.y += alien.sprite.vy;
			
			if ( alien.sprite.y > canvas.height)
			{
				console.log(alien);
				gameState = GAMEEND;
			}
		}
		
	}

	function endGame()
	{

	}

	function render()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for ( var i = 0; i < sprites.length; i ++ )
		{
			var sprite = sprites[i];
			ctx.drawImage(image,
					sprite.srcX, sprite.srcY,
					sprite.srcW, sprite.srcH,
					Math.floor(sprite.x), Math.floor(sprite.y),
					sprite.w, sprite.h
					);
		}
	}
	
	function makeAlien(){
		var alien = new AlienObject();
		alien.sprite.srcX = 32;
		alien.sprite.y = -alien.sprite.h;
		alien.sprite.x = getRandom(0,14)*alien.sprite.w;
		
		alien.sprite.vy = 1;
		sprites.push(alien.sprite);
		aleins.push(alien);
	}
	
	function fireMissile()
	{
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
		setTimeout(function (){
			removeObject(alien.sprite, sprites);
			removeObject(alien, aleins);
		},1000);
	}
	
	update();
});