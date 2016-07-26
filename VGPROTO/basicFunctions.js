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