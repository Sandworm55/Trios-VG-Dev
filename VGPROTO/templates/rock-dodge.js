	var app = angular.module("rockDodge",[]);
	
	app.directive("rockDodgeDirective",function(){
		return{
			restrict:'E',
			templateUrl:"templates/extra-stuff-body.html"
		};
	});	
$(window).resize(resiszeCanvas);
	
	function resiszeCanvas() {
		canvas.attr("width", $(window).get(0).innerWidth);
		canvas.attr("height", $(window).get(0).innerHeight);
		context.fillRect(0,0, canvas.width(), canvas.height());
	}