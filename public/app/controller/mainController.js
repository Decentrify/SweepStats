'use strict';

(function(){

	angular.module('stats')
		.controller('MainController',['$log', '$cookies', MainController]);


	
	function MainController($log, $cookies){
        
		$log.debug('Main Controller Initialized');
        $cookies.remove('data');
	}


})();
