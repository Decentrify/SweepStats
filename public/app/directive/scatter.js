'use strict';

(function(){

	angular.module('stats')
        
		.directive('sweepScatter', scatter)
		.directive('clickDirective', clickDirective)
		.directive('uploader',['$location','$cookies', uploader]);

	function uploader($location, $cookies){

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
						
                        var xAxisLocation = scope.container.xAxis.location;
                        var yAxisLocation = scope.container.yAxis.location.split(",");
                        
						var result = analyzeDataAdvanced(xAxisLocation, yAxisLocation, csv.data);
                        
                        if(result != null && !(result.length == 0)) {
                            
                            var array = scope.container.yAxis.legends.split(",");
                            
                            var legend = {
                                firstArray : array[0],
                                secondArray : array[1],
                                thirdArray : array[2]
                            };
                            
                            console.log("Result");
                            console.log(result);
                            
                            $cookies.putObject('data', result);
                            $cookies.putObject('metadata', scope.container.metadata);
                            $cookies.putObject('legends', legend);
                            
                            scope.$apply(function(){
                                $location.path("/charts");  // Redirect to the display one.
                            });
                        }
                        
                        else {
                            $cookies.remove('data');
                        }
                        
						element.val("");
					};

					reader.readAsText(changeEvent.target.files[0]);
				})
			}
		}


	}

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


	function scatter(){
		console.log('Scatter Plot Directive');

		return{

			restrict: 'E',
			scope:{
				data :'=',
                legends:'='
			},

			link: function(scope, elem, attrs){

                var chart = new Highcharts.Chart({

                    chart: {
                        type: 'scatter',
                        renderTo: elem[0],
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
                            text: 'Entries'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 100,
                        y: 70,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                        borderWidth: 1
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 5,
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
                                pointFormat: '{point.x} s, {point.y} entries'
                            }
                        }
                    },
                    series: [
                        {
                            name: scope.legends.firstArray,
                            color: 'rgba(223, 83, 83, .5)',
                            data: scope.data.firstArray
                        }, 
                        {
                            name: scope.legends.secondArray,
                            color: 'rgba(119, 152, 191, .5)',
                            data: scope.data.secondArray
                        },
                        
                        {
                            name: scope.legends.thirdArray,
                            color: 'rgba(99, 200, 138, 1)',
                            data: scope.data.thirdArray
                        }
                    ]
                })

			},

			template: '<div id="container" style="margin 0 auto; width: 500px" class="medium-top-buffer"> Not Working </div>'
		}		
	}




    function analyzeDataAdvanced (xAxisLocation , yAxisLocation, data){

        console.log(" Advanced Analysis of Data, start Time line from 0");
        
        var csvArray = data.split("\n");
        var lineArray = [];

        var xLoc = parseInt(xAxisLocation);
        var yLoc = [];
        
        for(var j =0, size = yAxisLocation.length; j < size ; j++){
            yLoc.push(parseInt(yAxisLocation[j]));
        }
        
        console.log("Y Loc Created ");
        console.log(yLoc);
        
        var result = {
            
            firstArray : [],
            secondArray : [],
            thirdArray : []
        };
        
        var first = true;
        for(var i =0, len= csvArray.length; i < len ; i ++){
            
            lineArray = csvArray[i].split(",");
            
            if(first){
                var baseTime = ( parseInt(lineArray[xLoc])/1000 -1 );
                first = false;
            }
            result.firstArray.push([ (parseInt(lineArray[xLoc], 10)/1000 - baseTime), parseInt(lineArray[yLoc[0]], 10)]);
            result.secondArray.push([ (parseInt(lineArray[xLoc], 10)/1000 - baseTime), parseInt(lineArray[yLoc[1]], 10)]);
            result.thirdArray.push([ (parseInt(lineArray[xLoc], 10)/1000 - baseTime), parseInt(lineArray[yLoc[2]], 10)]);
        }


        return result;
    }
    
    
    
}());
