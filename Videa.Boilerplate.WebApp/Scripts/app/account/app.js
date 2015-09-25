(function (angular) {
    window.videaApp = angular.module('videaApp', ['videaShared', 'ngRoute', 'ui.bootstrap', 'ui.utils', 'videaUtil']);
    window.videaApp.config([
        '$routeProvider', '$httpProvider',
        function ($routeProvider, $httpProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: '/Scripts/app/account/templates/view-stations.html',
                    controller: 'ViewStationsController'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $httpProvider.interceptors.push('httpInterceptor');
        }
    ]);

})(angular);