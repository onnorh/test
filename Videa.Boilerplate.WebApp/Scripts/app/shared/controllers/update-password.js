window.videaShared.controller('UpdatePasswordController', [
    '$scope',
    function ($scope) {
        $scope.Password = '';
        $scope.ConfirmPassword = '';
        $scope.Email = '';

        $scope.init = function (email) {
            $scope.Email = email;

            $scope.loadedModel = PreloadStore.get("model");
        }

        $scope.submit = function (userForm, $event) {
            //if (!userForm.$valid) {
            //    $scope.showErrors = true;
            //    $event.preventDefault();
            //}
        }
    }
]);