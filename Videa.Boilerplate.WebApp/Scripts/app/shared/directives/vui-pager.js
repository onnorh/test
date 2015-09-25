window.videaShared.directive('vuiPager', [
function () {
    return {
        restrict: 'EA',
        templateUrl: "/Scripts/app/shared/templates/vui-pager.html",
        replace: true,
        transclude: false,
        controller: (['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
            $scope._changeFunction = $attrs.changeFunction;
            $scope._maxSize = $scope.$eval($attrs.maxSize);

            $scope.changeFunction = function () {
                $scope[$attrs.changeFunction]($scope.currentPage);
            }
        }])
    }
}]);