$(document).ready(function ()
{
	var canvas = document.querySelector("canvas");
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
	}
	
	function playGame()
	{
		
	}
	
	function endGame()
	{
		
	}
	
	function render()
	{
		
	}
	
	update();
});