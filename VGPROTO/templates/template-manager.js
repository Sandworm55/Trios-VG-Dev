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
		this.HCclick = function ()
		{
			$("#cct #HCPDF").slideToggle(2000);
		};

		this.picturesClick = function ()
		{
			$("#cct #pictures").slideToggle(2000);
			$("#cct #myCarousel").carousel(0);
		};
		// Activate Carousel
		$("#cct #myCarousel").carousel();

		// Enable Carousel Indicators
		$("#cct .item1").click(function ()
		{
			$("#cct #myCarousel").carousel(0);
		});
		$("#cct .item2").click(function ()
		{
			$("#cct #myCarousel").carousel(1);
		});
		$("#cct .item3").click(function ()
		{
			$("#cct #myCarousel").carousel(2);
		});
		$("#cct .item4").click(function ()
		{
			$("#cct #myCarousel").carousel(3);
		});
		$("#cct .item5").click(function ()
		{
			$("#cct #myCarousel").carousel(4);
		});

		// Enable Carousel Controls
		$("#cct .left").click(function ()
		{
			$("#cct #myCarousel").carousel("prev");
		});
		$("#cct .right").click(function ()
		{
			$("#cct #myCarousel").carousel("next");
		});
	});
	
	app.controller("DAController", function ()
	{
		this.HCclick = function ()
		{
			$("#darkAdam #HCPDF").slideToggle(2000);
		};

		this.picturesClick = function ()
		{
			$("#darkAdam #pictures").slideToggle(2000);
			$("#darkAdam #myCarousel").carousel(0);
		};
		// Activate Carousel
		$("#darkAdam #myCarousel").carousel();

		// Enable Carousel Indicators
		$("#darkAdam .item1").click(function ()
		{
			$("#darkAdam #myCarousel").carousel(0);
		});
		$("#darkAdam .item2").click(function ()
		{
			$("#darkAdam #myCarousel").carousel(1);
		});
		$("#darkAdam .item3").click(function ()
		{
			$("#darkAdam #myCarousel").carousel(2);
		});
		$("#darkAdam .item4").click(function ()
		{
			$("#darkAdam #myCarousel").carousel(3);
		});
		$("#darkAdam .item5").click(function ()
		{
			$("#darkAdam #myCarousel").carousel(4);
		});

		// Enable Carousel Controls
		$("#darkAdam .left").click(function ()
		{
			$("#darkAdam #myCarousel").carousel("prev");
		});
		$("#darkAdam .right").click(function ()
		{
			$("#darkAdam #myCarousel").carousel("next");
		});
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
				restrict: 'A',
				templateUrl: "templates/dark-adam.html"
			};
		}]);
})();