(function(){
	var app = angular.module("templateManager",[]);
	
	app.directive("navBar",function(){
		return{
			restrict:'E',
			templateUrl:"templates/nav-bar.html"
		};
	});
	
	app.directive("homeBody",function(){
		return{
			restrict:'E',
			templateUrl:"templates/home-body.html"
		};
	});
	
	app.directive("extraStuffBody",function(){
		return{
			restrict:'E',
			templateUrl:"templates/extra-stuff-body.html"
		};
	});
	
	app.controller("TabController", function() {
		this.tab = 1;

		this.isSet = function(checkTab) {
			return this.tab === checkTab;
		};

		this.setTab = function(setTab) {
			this.tab = setTab;
		};
	});
	
	app.controller("SideTabController", function() {
		this.SideTab = 0;

		this.isSetSide = function(checkSideTab) {
			return this.SideTab === checkSideTab;
		};

		this.setSideTab = function(setSideTab) {
			this.SideTab = setSideTab;
		};
	});	
	
	app.controller("AssignTabController", function() {
		this.AssignTab = 0;

		this.isSetAssign = function(checkAssignTab) {
			return this.AssignTab === checkAssignTab;
		};

		this.setAssignTab = function(setAssignTab) {
			this.AssignTab = setAssignTab;
		};
	});
	
	app.directive("smallGames",['$window',function($window){
		return{
			restrict:'E',
			templateUrl:"small-games.html"
		};
	}]);	
})();