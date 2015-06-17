'use strict';

(function(){

	angular.module('stats')
		.controller('MainController',['$log', MainController]);


	
	function MainController($log){
		$log.debug('Main Controller Initialized');
	}


})();
