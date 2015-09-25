window.videaApp.controller('LoginController', [
    '$scope',
    function ($scope) {
        $scope.user = {
            email: '',
            password: ''
        }

        $scope.init = function (user) {
            $scope.user = user || $scope.user;
        }

        $scope.submitted = false;
        $scope.errorMessage = '';

        $scope.changeErrorMessage = function () {
            if (!$scope.user.email && !$scope.user.password) {
                $scope.errorMessage = 'Please enter your username and password.';
            } else if (!$scope.user.email) {
                $scope.errorMessage = 'Please enter your username.';
            } else if (!$scope.user.password) {
                $scope.errorMessage = 'Please enter your password.';
            }
        }

        $scope.$watch('loginForm.$valid', function (newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.changeErrorMessage();
            }
        }, true);

        $scope.submit = function () {
            $scope.changeErrorMessage();
            $scope.submitted = true;
        }
    }
]);
