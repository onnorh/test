window.videaShared.directive('userSettings', function () {

    return {
        restrict: 'E',
        transclude: true,
        templateUrl: '/Scripts/app/shared/templates/user-settings.html',
        replace: true,
        controller: 'GeneralPreferencesController'
    };
});