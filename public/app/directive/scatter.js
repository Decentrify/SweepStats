'use strict';

(function(){

	angular.module('stats')
        
		.directive('sweepScatter', scatter)
		.directive('clickDirective', clickDirective)
		.directive('uploader',['$location','$cookies', uploader]);

	function uploader($location, $cookies){

		return {

			restrict: 'A',
			link: function(scope, element, attrs){
				
				element.bind('change', function(changeEvent){
                    
                    
					var reader = new FileReader();

					reader.onload = function(loadEvent){
                        
						var csv = {
							data: loadEvent.target.result
						};
						
						var result = analyzeDataAdvanced(csv.data);
                        console.log(result);
                        
                        if(result != null && !(result.length == 0)){
                            
                            
                            var metadata = {
                                
                                overlay : 'gradient',
                                gradientShuffle: 3000,
                                croupierShuffle: 3000,
                                maxExchangeCount: 25,
                                controlPull: 3000,
                                indexPull: 4000
                            };
                            
                            $cookies.putObject('data', result);
                            $cookies.putObject('metadata', metadata);

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
				data :'='
			},

			link: function(scope, elem, attrs){

                var chart = new Highcharts.Chart({

                    chart: {
                        type: 'scatter',
                        renderTo: elem[0],
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Analyzing the 50%, 75% & 99%.'
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
                    series: [{
                        name: 'fifty',
                        color: 'rgba(223, 83, 83, .5)',
                        data: scope.data.fiftyArray

                    }, {
                        name: 'seventy five',
                        color: 'rgba(119, 152, 191, .5)',
                        data: scope.data.seventyFiveArray
                    },
                        {
                            name: 'ninety nine',
                            color: 'rgba(99, 200, 138, 1)',
                            data: scope.data.ninetyArray
                    }]
                })

			},

			template: '<div id="container" style="margin 0 auto; width: 500px" class="medium-top-buffer"> Not Working </div>'
		}		
	}

	
	function analyzeData(data){

		console.log("Call to analyze the data is made.");
		var csvArray = data.split("\n");
		
		var lineArray = [];

		var result = {

			fiftyArray : [],
			seventyFiveArray : [],
			ninetyArray : []
		};

		for(var i =0, len= csvArray.length; i < len ; i ++){
			
			lineArray = csvArray[i].split(",");
			result.fiftyArray.push([parseInt(lineArray[2], 10)/1000, parseInt(lineArray[5], 10)]);
			result.seventyFiveArray.push([parseInt(lineArray[2], 10)/1000, parseInt(lineArray[6], 10)]);
			result.ninetyArray.push([parseInt(lineArray[2], 10)/1000, parseInt(lineArray[7], 10)]);
		}


		return result;
	}




    function analyzeDataAdvanced(data){

        console.log(" Advanced Analysis of Data, start Time line from 0");
        
        var csvArray = data.split("\n");

        var lineArray = [];

        var result = {

            fiftyArray : [],
            seventyFiveArray : [],
            ninetyArray : []
        };
        
        var first = true;
        for(var i =0, len= csvArray.length; i < len ; i ++){
            
            lineArray = csvArray[i].split(",");
            
            if(first){
                var baseTime = ( parseInt(lineArray[2])/1000 -1 );
                first = false;
            }
            result.fiftyArray.push([ (parseInt(lineArray[2], 10)/1000 - baseTime), parseInt(lineArray[5], 10)]);
            result.seventyFiveArray.push([ (parseInt(lineArray[2], 10)/1000 - baseTime), parseInt(lineArray[6], 10)]);
            result.ninetyArray.push([ (parseInt(lineArray[2], 10)/1000 - baseTime), parseInt(lineArray[7], 10)]);
        }


        return result;
    }
    
    
    
}());
