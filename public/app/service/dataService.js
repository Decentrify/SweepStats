'use strict';

(function(){
    
    angular.module('stats')
        .factory('DataService', ['$log', dataService]);
    
    
    
    function dataService($log){
        
        var storage ={};
        
        return {

            storeData : function(data){
                
                $log.debug("storing the data");
                storage = data;
            },
            
            retrieveData : function(){
                
                $log.debug("retrieving the data");
                return storage;
            }
            
        }
    }
    
    
}());