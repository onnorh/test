window.videaShared.controller('GeneralPreferencesController', [
    '$scope', '$window', 'generalPreferencesService',
    function ($scope, $window, generalPreferencesService) {

        $scope.profile = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            currentPhoneNumber: '',
            newPhoneNumber: '',
            confirmPhoneNumber: '',
        }

        var mapProperties = function (object1, object2) {
            angular.forEach(object1, function (value, key) {
                if (key in object2) {
                    object2[key] = value;
                }
            });
        };

        $scope.loadedModel = null;
        //$scope.loadedModel.modelState = {};

        $scope.init = function () {
            $scope.loadedModel = PreloadStore.get("model");
            mapProperties($scope.loadedModel, $scope.profile);
        }

        $scope.clearForm = function ()
        {
            mapProperties($scope.loadedModel, $scope.profile);
            $scope.loadedModel.modelState = null;
        }

        $scope.dirtyModalShown = false;

        $scope.toggleDirtyModal = function() {
            $scope.dirtyModalShown = !$scope.dirtyModalShown;
        }

        $scope.init();

        $scope.saveUserProfile = function() {
            if ($scope.userSettingsForm.$valid) {
                generalPreferencesService.saveProfile($scope.profile).then(
                   function (response) {
                       $scope.loadedModel.modelState = response.data;
                   },
                   function (response) {
                       alert('Error: ' + response);
                   }
               );
            };
    }
    }
]);
