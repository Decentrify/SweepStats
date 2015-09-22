(function(){


    angular.module('stats')
        .controller('PercentileLagController',['$log', '$scope', 'DataService', PercentileLagController]);


    function PercentileLagController($log, $scope, DataService){

        var self = this;
        self.container = [];

        $scope.$watchCollection( DataService.retrievePercentileJSONData, function(updatedData){
            $log.debug("Collection updated, constructing the container ");
            self.container = restructureData(updatedData);
            $log.debug(angular.toJson(self.container));
        })
    }




    function restructureData(baseJsonData){

        var i, len, minTime;
        var result = {
            fifty:[],
            seventyFive:[],
            ninety:[]
        };

        if(baseJsonData.length > 0){
            minTime = baseJsonData[0].time;
        }

        for(i= 0, len = baseJsonData.length; i < len ; i ++){
            if(baseJsonData[i].time < minTime){
                minTime = baseJsonData[i].time;
            }
        }

//      AT THIS POINT TIME IN EACH OBJECT IS RESTRUCTURED.
        for( i=0 , len= baseJsonData.length; i < len ; i++){

            baseJsonData[i].time = baseJsonData[i].time - minTime;
            result.fifty.push([(baseJsonData[i].time/1000), baseJsonData[i].fifty]);
            result.seventyFive.push([(baseJsonData[i].time/1000), baseJsonData[i].seventyFive]);
            result.ninety.push([(baseJsonData[i].time/1000), baseJsonData[i].ninety]);
        }


        return result;
    }


}());