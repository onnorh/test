window.videaShared.controller('ForgotPasswordController', [
    '$scope',
    function ($scope) {
        $scope.loadedModel = null;
        $scope.init = function () {
            $scope.loadedModel = PreloadStore.get("model");
        }
    }
]);