window.videaShared.directive("autoComplete", ['$rootScope', function ($rootScope) {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        templateUrl: "/Scripts/app/shared/templates/autoComplete.html",
        rootScope: {
          serachList: "="  
        },
        require: 'ngModel',
        controller: 'AutoCompleteController',
        link: function (scope, rootScope, attrs, ngModel) {
            
            $rootScope.$watch('selectedIndex', function(val) {
                if (val !== -1 && rootScope.suggestions != 'undefined') {
                    scope.ssSearch = rootScope.suggestions[rootScope.selectedIndex];
                }
            });
        }
    };
}]);