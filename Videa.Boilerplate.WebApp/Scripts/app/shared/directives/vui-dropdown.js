window.videaShared.directive('vuiDropdown', [
    function () {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            templateUrl: "/Scripts/app/shared/templates/vui-dropdown.html",
            scope: { config: "=", selectedItem: "=" },
            controller: (['$scope', function ($scope) {
                $scope.isOpen = false;
                $scope.itemSelected = function(item) {
                    $scope.isOpen = false;
                    $scope.config.selectedItem = item;
                }

                $scope.styleBaseWidth = $scope.config.width;
                $scope.styleDropDownHeight = $scope.config.height;
                $scope.styleInnerWidth = $scope.config.width - 16;
                $scope.styleDisplayDivWidth = $scope.config.width - 10;
                $scope.styleDownIconLeftMargin = 0;
                $scope.styleDropDownWidth = $scope.config.width;
                $scope.styleTriangleUpLeft = $scope.config.width - 25;
            }])
        };
    }]);