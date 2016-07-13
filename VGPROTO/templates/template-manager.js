
	var app = angular.module("templateManager",[]);
	
	app.directive("navBar",function(){
		return{
			restrict:'E',
			templateUrl:"templates/nav-bar.html"
		};
	});
	
	app.directive("w3TestDirective", function() {
		return {
			template : "<h1>Made by a directive!</h1>"
		};
	});