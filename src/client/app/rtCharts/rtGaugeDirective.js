/**
 * Created by Eliacer on 3/04/2017.
 */
(function () {
    'use strict';
    
    angular
        .module('rtCharts')
        .directive('rtGauge', rtGaugeControl);

    rtGaugeControl.$inject = ['rtWebMetricsService'];
    
    function rtGaugeControl(rtWebMetricsService) {
        return {
            // objeto cope se hereda del scope padre
            templateUrl: 'app/rtCharts/rtGaugeTemplate.html',
            link: function (scope, el, attrs) {
                alert(scope);
                scope.initialized = false;

                scope.options = {
                    redFrom: 90, redTo: 100,
                    yellowFrom: 75, yellowTo: 90,
                    minorTicks: 5
                };

                scope.$on('socket', function (evt, data) {
                    if (!scope.initialized) {
                        scope.data = google.visualization.arrayToDataTable([
                            ['Label', 'Value'],
                            ['CPU %', 0]
                        ]);

                        scope.chart = new google.visualization.Gauge(el[0]);
                        scope.initialized = true;
                    }

                    scope.data.setValue(0, 1, Math.round(data.cpuPct));
                    scope.chart.draw(scope.data, scope.options);
                });

                // scope.data = google.visualization.arrayToDataTable([
                //     ['Label','Value'],
                //     ['CPU %',0]
                // ]);
                //
                // scope.chart = new google.visualization.Gauge(el[0]);
                // //scope.data.setValue(0,1, Math.round(data.cpuPct));
                // scope.chart.draw(scope.data, scope.options);

            }
        };
    }
})();