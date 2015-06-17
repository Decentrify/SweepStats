'use strict';
(function(){
	console.log('going to register the module');
	var app = angular.module('stats',['ngRoute']);

	app.config(['$logProvider', '$routeProvider', function($logProvider, $routeProvider){
		$logProvider.debugEnabled(true);

		$routeProvider
			.when("/", {

				templateUrl:'/views/main.html',
				controller:'MainController',
				controllerAs:'mainController'

			})
			.when('/charts',{

				templateUrl:'/views/charts.html',
				controller: 'MainController',
				controllerAs: 'chartController'
			})

	}]);

})();
