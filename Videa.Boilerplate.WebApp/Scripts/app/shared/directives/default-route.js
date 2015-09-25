/*

This attribute sets the default route for ng-app leveraging ng-route based routing

*/

window.videaShared.directive('defaultRoute', function () {
    return {
        restrict: 'A',
        scope: {
            defaultRoute: '@'
        },

        controller: ['$scope', '$location', function ($scope, $location) {
            $scope.checkDefaultRoute = function () {
                if ($location.path() == '') {
                    $location.path($scope.defaultRoute);
                }
            };
        }],

        link: function (scope, element, attrs) {
            scope.checkDefaultRoute(attrs);
        }
    }
});