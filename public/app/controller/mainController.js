'use strict';

(function(){

	angular.module('stats')
		.controller('MainController',['$log', '$cookies', MainController]);


	
	function MainController($log, $cookies){
        
		$log.debug('Updated Main Controller Initialized');
        
        $cookies.remove('loadedData');
        
        var self = this;
        self.container = {
            
            xAxis : {
                location: null
            },
            
            yAxis:[],
            
            metadata : {
                overlay : 'tree-gradient',
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
        };
        
        
        self.addNewRow = function(){
          
            $log.debug("Call to add new row to y axis data");
            self.container.yAxis.push({
                location: null,
                legend: null,
                color: null,
                maxValue: null,
                data:[]
            })
        };
        
        
        self.lastChoice = function(){
            
            var lastChoice = $cookies.getObject('lastChoice');
            self.container = lastChoice != null ? lastChoice : self.container;
        }
        
	}

    
})();
