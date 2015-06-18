'use strict';

(function(){

	angular.module('stats')
		.controller('MainController',['$log', '$cookies', MainController]);


	
	function MainController($log, $cookies){
        
		$log.debug('Main Controller Initialized');
        
        $cookies.remove('data');
        $cookies.remove('metadata');
        $cookies.remove('legends');
        
        var self = this;
        
        self.container = {
            xAxis : {
                location: null
            },
            
            yAxis : {
                location: null,
                legends: null
            },

            metadata : {
                overlay : 'gradient',
                gradientShuffle: 3000,
                croupierShuffle: 3000,
                maxExchangeCount: 25,
                controlPull: 3000,
                indexPull: 4000
            }
        }
        
	}


})();
