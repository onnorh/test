window.videaShared.controller('LoadingController', [
    '$scope', 'requestNotificationChannel',
    function ($scope, requestNotificationChannel) {
        $scope.notificationMessaging = requestNotificationChannel;
                
        $scope.modalShown = false;

        $scope.$watch('notificationMessaging', function () {
            
            if ($scope.notificationMessaging.requestsInFlight > 0) {
                $scope.modalShown = true;

            } else if ($scope.notificationMessaging.requestsInFlight < 1) {
                $scope.modalShown = false;
            }
            
        },true);
        
    }
]);