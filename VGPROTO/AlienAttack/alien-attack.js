$(document).ready(function ()
{

	var cannon = document.querySelector("#cannon");
	var alien = document.querySelector("#alien");
	var missle = document.querySelector("#explosion");
	var inputX = document.querySelector("#inputX");
	var inputY = document.querySelector("#inputY");
	var output = document.querySelector("#output");
	var button = document.querySelector("#button");

	var alienX = 80;
	var alienY = 20;
	var guessX = 0;
	var guessY = 0;
	var shotsRemaining = 8;
	var shotsMade = 0;
	var gameState = "";
	var gameWon = false;

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
		
	}
});