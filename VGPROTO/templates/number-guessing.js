console.log("starting shit up");
$(document).ready(function ()
{
    console.log("GameLogic() loaded");
    // Game variables
    var ceiling = 99;
    var mysteryNumber = Math.floor(Math.random() * ceiling + 1);
    var playerGuess = 0;
    var guessesRemaining = 10;
    var guessesMade = 0;
    var gameState = "";
    var gameWon = false;

    var input = document.querySelector("#inputField");
    var output = document.querySelector("#outputField");
    var button = document.querySelector("#guessButton");

    button.addEventListener("click", clickHandler, false);

    function clickHandler()
    {
        console.log("click:" + playerGuess + "real:" + mysteryNumber);
        validateInput();
    }

    function validateInput()
    {
        playerGuess = parseInt(input.value);

        if ( isNaN(playerGuess) )
            output.innerHTML = "Please enter a number.";
        else if ( playerGuess < 0 || playerGuess > ceiling )
            output.innerHTML = "Number not in range.";
        else
            playGame();
    }
    
    /**
     * Runs the basic checks for the number guessing game
     * 
     */
    function playGame()
    {
        guessesRemaining -= 1;
        guessesMade += 1;

        gameState = " Guess: " + guessesMade + ", Remaining: " + guessesRemaining;

        playerGuess = parseInt(input.value);

        if ( playerGuess > mysteryNumber )
            output.innerHTML = "That's too high." + gameState;
        else if ( playerGuess < mysteryNumber )
            output.innerHTML = "That's too low" + gameState;
        else if ( playerGuess == mysteryNumber )
            gameWon = true;

        if ( guessesRemaining < 1 || gameWon == true )
            endGame();
    }

    function endGame()
    {
        if ( gameWon )
            output.innerHTML =
                    "Yes, it's " + mysteryNumber + "!" + "<br>" +
                    "It took you " + guessesMade + " guesse" + ((guessesMade == 1) ? "." : "s.");
        else
            output.innerHTML =
                    "No more guesses left!" + "<br>" +
                    "The number was: " + mysteryNumber + ".";

        button.removeEventListener("click", clickHandler, false);
        button.disabled = true;

        input.disabled = true;
    }
});