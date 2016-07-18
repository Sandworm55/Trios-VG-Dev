$(document).ready(function(){
	
	var canvas 		= $("#asteroidAvoid");
	var ctx 		= canvas.get(0).getContext("2d");
	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	// Game interface
	var ui 			= $("#gameUI");
	var uiIntro 	= $("#gameIntro");
	var uiStats 	= $("#gameStats");
	var uiComplete 	= $("#gameComplete");
	var uiPlay 		= $("gamePlay");
	var btReset 	= $(".gameReset");
	var btScore 	= $(".gameScore");
	
	// Game settings
	var playGame;	// boolean flag
	var asteroids;	// array that holds all the asteroids
	var numAseroids;// number of active asteroids
	var player;		// the player spaceship
	var score;		// the current score
	var scoreTimeout;//the timer object to increment score

	// Keyboard keycodes
	var arrowUp 	= 38;
	var arrowRight 	= 39;
	var arrowDown 	= 40;
});