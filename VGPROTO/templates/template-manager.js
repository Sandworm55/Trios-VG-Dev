(function ()
{
	var app = angular.module("templateManager", []);

	app.directive("navBar", function ()
	{
		return{
			restrict: 'E',
			templateUrl: "templates/nav-bar.html"
		};
	});

	app.directive("homeBody", function ()
	{
		return{
			restrict: 'E',
			templateUrl: "templates/home-body.html"
		};
	});

	app.directive("extraStuffBody", function ()
	{
		return{
			restrict: 'E',
			templateUrl: "templates/extra-stuff-body.html"
		};
	});

	app.controller("TabController", function ()
	{
		this.tab = 1;

		this.isSet = function (checkTab)
		{
			return this.tab === checkTab;
		};

		this.setTab = function (setTab)
		{
			this.tab = setTab;
		};
	});

	app.controller("SideTabController", function ()
	{
		this.SideTab = 0;

		this.isSetSide = function (checkSideTab)
		{
			return this.SideTab === checkSideTab;
		};

		this.setSideTab = function (setSideTab)
		{
			this.SideTab = setSideTab;
		};
	});

	app.controller("CCTController", function ()
	{
		this.GDDclick = function ()
		{
			console.log("clicked");
			$("#GDDPDF").slideToggle(2000);
		};
	});

	app.controller("AssignTabController", function ()
	{
		this.AssignTab = 0;

		this.isSetAssign = function (checkAssignTab)
		{
			return this.AssignTab === checkAssignTab;
		};

		this.setAssignTab = function (setAssignTab)
		{
			this.AssignTab = setAssignTab;
		};
	});

	app.directive("smallGames", ['$window', function ($window)
		{
			return{
				restrict: 'E',
				templateUrl: "small-games.html"
			};
		}]);

	app.directive("chickenCoopTroop", ['$window', function ($window)
		{
			return{
				restrict: 'A',
				templateUrl: "templates/chicken-coop-troop.html"
			};
		}]);

	app.directive("darkAdam", ['$window', function ($window)
		{
			return{
				restrict: 'E',
				templateUrl: "templates/dark-adam.html"
			};
		}]);
})();