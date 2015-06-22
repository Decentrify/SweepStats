'use strict';

(function(){

	angular.module('stats')
        
		.directive('sweepScatter', scatter)
		.directive('clickDirective', clickDirective)
		.directive('uploader',['$location','$cookies','DataService', uploader]);


    /**
     * Initiate the file upload mechanism.
     * Once the file is uploaded, simply analyze the data and
     * redirect it to the next page on successful upload.
     * *
     * @param $location
     * @param $cookies
     * @returns {{restrict: string, scope: {container: string}, link: link}}
     * @param DataService
     */
	function uploader($location, $cookies, DataService){

		return {

			restrict: 'A',
            scope:{
                container: "="
            },
			link: function(scope, element, attrs){
				
				element.bind('change', function(changeEvent){
                    
                    
					var reader = new FileReader();

					reader.onload = function(loadEvent){
                        
						var csv = {
							data: loadEvent.target.result
						};
                        
                        $cookies.putObject('lastChoice', scope.container);
                        analyzeData(scope.container, csv.data);
                        DataService.storeData(scope.container);
                        
                        scope.$apply(function(){
                            $location.path("/charts");  // Redirect to the display one.
                        });
                        
						element.val("");
					};

					reader.readAsText(changeEvent.target.files[0]);
				})
			}
		}


	}

	


	function scatter(){
        
		console.log('Scatter Plot Directive');

        /**
         * Internal function to construct the series array for the
         * data passed by the controller.
         *  
         * @param data
         * @returns {Array}
         * @private
         */
        function _constructSeriesArray(data){
            
            var seriesArray = [];

            for(var i= 0, len = data.length; i < len; i++){
                
                var obj = {};
                obj.name = data[i].legend;
                obj.color = data[i].color;
                obj.data = data[i].data;
                
                seriesArray.push(obj);
            }
            
            return seriesArray;
        }
        
        
        //**************
        // API EXPOSED
        //**************
        
		return{

			restrict: 'E',
			scope:{
				data :'='
			},

			link: function(scope, elem, attrs){
                
                var seriesArray = _constructSeriesArray(scope.data.yAxis);
                
                var chart = new Highcharts.Chart({

                    chart: {
                        type: 'scatter',
                        renderTo: 'container',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Sweep Evaluations'
                    },
                    subtitle: {
                        text: 'Sweep Scenarios'
                    },
                    xAxis: {
                        title: {
                            enabled: true,
                            text: 'Time(s)'
                        },
                        startOnTick: true,
                        endOnTick: true,
                        showLastLabel: true
                    },
                    yAxis: {
                        title: {
                            text: 'Percentage Nodes'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 470,
                        y: 220,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                        borderWidth: 1
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 3,
                                states: {
                                    hover: {
                                        enabled: true,
                                        lineColor: 'rgb(100,100,100)'
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                            tooltip: {
                                headerFormat: '<b>{series.name}</b><br>',
                                pointFormat: '{point.x} s, {point.y} % nodes'
                            }
                        }
                    },
                    series: seriesArray
                })

			},

			template: '<div id="container" style="height: 500px; width: 100%" class="medium-top-buffer"> Not Working </div>'
		}		
	}


    /**
     * Simply directive to relay the click to another hidden
     * element in the system.
     *
     * @returns {{restrict: string, link: link}}
     */
    function clickDirective(){

        return {
            restrict:'A',
            link: function($scope, elem, attrs){

                elem.bind('click', function(clickEvent){

                    var uploaderElem = angular.element(document.querySelector("#fileUploader"));
                    uploaderElem.trigger('click');
                })
            }
        }

    }
    
    
    
    /**
     * Look at the container and then start analyzing the data 
     * accordingly.
     *
     * @param container
     * @param csvData
     */
    function analyzeData ( container, csvData ){
        
        var xLoc = integerify (container.xAxis.location);
        var yData = container.yAxis;

        var csvLineArray = csvData.split("\n");  // Split the data in terms of lines first.
        
        // Start creating the data.
        var first = true;
        for(var i= 0, len = csvLineArray.length; i<len; i++){
            
            if(csvLineArray[i]=="")
                continue;
            
            var lineArray = csvLineArray[i].split(",");
            if(first){
                var baseTime = ((parseInt(lineArray[xLoc], 10)/1000) - 1);
                first = false;
            }
            
            for( var j= 0, size = yData.length; j< size; j++ ){
                
                var dataArray = (yData[j].data!= null) ? yData[j].data : [];
                var yLoc = integerify(yData[j].location);
                var yMaxVal = integerify(yData[j].maxValue);
                
                
                dataArray.push([
                    Math.floor(parseInt(lineArray[xLoc], 10)/1000 - baseTime),
                    Math.floor(parseInt(lineArray[yLoc], 10)/ yMaxVal * 100)
                ]);
            }
        }
        
    }


    /**
     * Simply parseInt the value.
     * @param data
     */
    function integerify(data){
        return parseInt(data, 10);
    }
    
    
    
}());
