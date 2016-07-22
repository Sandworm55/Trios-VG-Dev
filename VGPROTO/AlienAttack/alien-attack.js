$(document).ready(function ()
{

	var cannon = document.querySelector("#cannon");
	var alien = document.querySelector("#alien");
	var missile = document.querySelector("#missile");
	var explosion = document.querySelector("#explosion");
	var inputX = document.querySelector("#inputX");
	var inputY = document.querySelector("#inputY");
	var output = document.querySelector("#output");
	var button = document.querySelector("#alien-attack button");

	var alienWidth = parseInt($("#alien").css("width"));
	var alienHeight = parseInt($("#alien").css("height"));

	var alienX = 80;
	var alienY = 20;
	var guessX = 0;
	var guessY = 0;
	var shotsRemaining = 8;
	var shotsMade = 0;
	var gameState = "";
	var gameWon = false;

	console.log(parseInt($("#alien").css("width")));

	button.addEventListener("click", clickHandler);
	
	function clickHandler()
	{
		validateInput();
	}
	
	function validateInput()
	{
		guessX = parseInt(inputX.value);
		guessY = parseInt(inputY.value);
		
		if ( isNaN(guessX) || isNaN(guessY))
		{
			output.innerHTML = "Please enter a valid number";
		}
		else
		{
			if (guessX < 0 || guessY < 0 || guessX > 300 || guessY > 300)
			{
				output.innerHTML = "Please enter a number in range";
			}
			else
			{
				playGame();
			}
		}
	}
	
	function playGame()
	{
		shotsRemaining -= 1;
		shotsMade += 1;
		gameState = "Shots: " + shotsMade + ", Remaining: " + shotsRemaining;
		
		if (hitX())
		{
			if (hitY())
			{
				gameWon = true;
				endGame();
			}
			else
				output.innerHTML = "Miss! " + gameState;
		}
		else
			output.innerHTML = "Miss! " + gameState;
		
		if(shotsRemaining < 1)
			endGame();
		
		if (!gameWon)
		{
			alienY += getRandom(20,30);
			alienX = getRandom(0,280);
			console.log(alienX + " - " + alienY);
		}
		
		updateGraphics();
	}
	
	function endGame()
	{
		if (gameWon)
			output.innerHTML = "Hit! You saved the earth!" + "<br>" + "It only took you " + shotsMade + " shots";
		else
			output.innerHTML = "You lost!<br>" + "The earth was destroyed!";
		
		button.removeEventListener("click",clickHandler);
		button.disabled = true;
	}
	
	function updateGraphics()
	{
		missile.style.left = guessX + "px";
		missile.style.top = guessY + "px";
		cannon.style.left = guessX + "px";
		alien.style.left = alienX + "px";
		alien.style.top = alienY + "px";
		
		if (gameWon)
		{
			explosion.style.display = "block";
			explosion.style.left = alienX + "px";
			explosion.style.top = alienY + "px";
			
			alien.style.display = "none";
			//missile.style.display = "none";
		}
	}
	
	function hitX()
	{
		if(guessX + 9 >= alienX && guessX <= (alienX + alienWidth))
			return true;
		else
			return false;
	}
	
	function hitY()
	{
		if (guessY + 9 >= alienY && guessY <= (alienY + alienHeight))
			return true;
		else
			return false;
	}
	
	/**
	 * gets a random int between bottom number and top provided
	 * @param {int} bot lowest number you can get
	 * @param {int} top highest number you can get
	 * @returns {int} random result
	 */
	function getRandom(bot,top)
	{
		return Math.floor(Math.random()*(top + 1 - bot)) + bot;
	}
});