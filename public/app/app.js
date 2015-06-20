'use strict';
(function() {
    console.log('going to register the module');
    var app = angular.module('stats', ['ngRoute','ngCookies']);

    app.config(['$logProvider', '$routeProvider',
        function($logProvider, $routeProvider) {
            $logProvider.debugEnabled(true);

            $routeProvider
                .when("/", {

                    templateUrl: '/views/mainupdated.html',
                    controller: 'MainControllerUpdated',
                    controllerAs: 'mainController'

                })
                .when('/charts', {

                    templateUrl: '/views/charts.html',
                    controller: 'ChartController',
                    controllerAs: 'chartController'
                })
        }
    ])
})();
