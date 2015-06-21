'use strict';

(function(){

	angular.module('stats')
		.controller('ChartController',['$log','$cookies', MainController]);

	function MainController($log, $cookies){
        
		$log.debug('Chart Controller Initialized');
		var self = this;

        var massagedData = $cookies.getObject('loadedData');
        self.data = massagedData;
        self.metadata = massagedData.metadata;
	}


})();
