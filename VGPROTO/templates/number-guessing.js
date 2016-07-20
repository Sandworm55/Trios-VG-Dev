console.log("starting shit up");
$(document).ready(function()
{
	console.log("GameLogic() loaded");
	// Game variables
	var mysteryNumber 		= 50;
	var playerGuess 		= 0;
	var guessesRemaining 	= 10;
	var guessesMade 		= 0;
	var gameState 			= ""
	
	var input 	= document.querySelector("#inputField");
	var output 	= document.querySelector("#outputField");
	var button 	= document.querySelector("#guessButton");
	
	button.addEventListener("click",clickHandler,false);
	
	function clickHandler()
	{
		console.log("click:"+playerGuess+ "real:"+mysteryNumber);
		playGame();
	}
	
	function playGame()
	{
		guessesRemaining -= 1;
		guessesMade += 1;
		
		gameState = " Guess: " + guessesMade + ", Remaining: " + guessesRemaining;
		
		playerGuess = parseInt(input.value);
		
		if ( playerGuess > mysteryNumber)
			output.innerHTML = "That's too high." + gameState;
		else if (playerGuess < mysteryNumber)
			output.innerHTML = "That's too low" + gameState;
		else
			output.innerHTML = "You got it!" + gameState;
	}
	
});