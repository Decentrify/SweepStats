'use strict';

(function(){

	angular.module('stats')
		.controller('ChartController',['$log','$cookies', 'DataService',MainController]);

	function MainController($log, $cookies, DataService){
        
		$log.debug('Chart Controller Initialized');
		var self = this;

        var massagedData = DataService.retrieveData();
        self.data = massagedData;
        self.metadata = massagedData.metadata;
	}


})();
