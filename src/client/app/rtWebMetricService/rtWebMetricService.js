/**
 * Created by Eliacer on 4/04/2017.
 */
(function () {
    'use strict';

    angular
        .module('rtWebMetricsService', [])
        .factory('rtWebMetricsService', rtWebMetricsService);

    rtWebMetricsService.$inject = ['$rootScope'];

    function rtWebMetricsService ($rootScope) {
        var socket = io.connect();

        socket.on('metricServiceDataEvent', function (data) {
            $rootScope.$broadcast('socket', data);
        });

        return {

        };
    }
})();