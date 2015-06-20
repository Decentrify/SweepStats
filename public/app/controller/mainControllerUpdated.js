'use strict';

(function(){

	angular.module('stats')
		.controller('MainControllerUpdated',['$log', '$cookies', MainController]);


	
	function MainController($log, $cookies){
        
		$log.debug('Updated Main Controller Initialized');
        
        $cookies.remove('data');
        $cookies.remove('metadata');
        $cookies.remove('legends');
        
        var self = this;
        
        self.container = {
            
            xAxis : {
                location: null,
                color: null
            },
            
            yAxis : [
                {
                    location: null,
                    legend: null,
                    color: null
                },
                {
                    location: null,
                    legend: null,
                    color: null
                },
                {
                    location: null,
                    legend: null,
                    color: null
                }
            ],
            
            metadata : {
                overlay : 'gradient',
                gradientShuffle: 3000,
                croupierShuffle: 3000,
                maxExchangeCount: 25,
                controlPull: 3000,
                indexPull: 4000
            }
        };
        
        
        self.remove = function(index){
            $log.debug("Call to remove item at index: " + index);
            self.container.yAxis.splice(index, 1);
        }
        
	}

    
})();
