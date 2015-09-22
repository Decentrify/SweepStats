'use strict';
(function() {
    console.log('going to register the module');
    var app = angular.module('stats', ['ngRoute','ngCookies']);

    app.config(['$logProvider', '$routeProvider',
        function($logProvider, $routeProvider) {
            $logProvider.debugEnabled(true);

            $routeProvider
                .when("/", {

                    templateUrl: '/views/main.html',
                    controller: 'MainController',
                    controllerAs: 'mainController'

                })
                .when('/charts', {

                    templateUrl: '/views/charts.html',
                    controller: 'ChartController',
                    controllerAs: 'chartController'
                })
                .when('/avgLag', {
                    templateUrl:'/views/systemLag.html',
                    controller: 'ReplicationLagController',
                    controllerAs: 'replicationLagController'
                })
                .when('/perLag', {
                    templateUrl:'/views/percentileReplicationLag.html',
                    controller: 'PercentileLagController',
                    controllerAs: 'percentileLagController'
                })
        }
    ])
})();
