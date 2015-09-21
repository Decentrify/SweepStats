'use strict';

(function(){
    
    angular.module('stats')
        .factory('DataService', ['$log', dataService]);
    
    
    
    function dataService($log){
        
        var storage = {};
        var jsonObj = {
            info:[]
        };

        return {

            storeData : function(data){
                
                $log.debug("storing the data");
                storage = data;
            },
            
            retrieveData : function(){
                $log.debug("retrieving the data");
                return storage;
            },

            storeJsonData : function(jsonString){

                $log.debug("Storing json data");
                $log.debug(jsonObj);
                jsonObj.info = angular.fromJson(jsonString);
                $log.debug(jsonObj);

            },

            retrieveJSONData: function(){
                return jsonObj.info;
            }
            
        }
    }
    
    
}());