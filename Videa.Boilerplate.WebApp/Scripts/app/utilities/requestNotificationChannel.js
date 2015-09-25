angular.module('videaRequestNotify', [])
    
.service('requestNotificationChannel', ['$rootScope', function ($rootScope) {
    this.requestsInFlight = 0;
}]);