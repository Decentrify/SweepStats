'use strict';

(function(){

	angular.module('stats')
		.controller('ChartController',['$log','$cookies', MainController]);

	function MainController($log, $cookies){
        
		$log.debug('Chart Controller Initialized');
		var self = this;
        
        var testData  = {
            fiftyArray :[],
            seventyFiveArray: [],
            ninetyArray:[]
        };
        
        var cookieData = $cookies.getObject('data'); // Look in the cookie store for the value.
        self.data = cookieData != null ? cookieData : testData;
	}


})();
