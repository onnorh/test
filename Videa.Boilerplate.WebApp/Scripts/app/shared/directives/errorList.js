window.videaShared.directive("errorlist", function() {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        templateUrl: "/Scripts/app/shared/templates/errorList.html",
        scope: { modelstate: "=", field : "@field" },
        controller: (['$scope', function($scope) {
            var t = 1;
        }])
    };
});