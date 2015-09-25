window.videaShared.controller('SendCodeController', [
    '$scope',
    function ($scope) {
        $scope.$watch('selectedProvider', function (newValue, oldValue) {
            if (newValue == oldValue) return;
            $scope.address = $scope.addresses[newValue];
        });

        $scope.init = function(addresses){
            $scope.addresses = addresses;
        }
    }
]);