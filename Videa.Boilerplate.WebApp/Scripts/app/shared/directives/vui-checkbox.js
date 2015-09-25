window.videaShared.directive('vuiCheckbox', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                value: '=',
                cbdisabled: '=',
                text: '@'
            },
            link: function (scope, element) {
                var skipIt = false;
                var input = element.find(':checkbox');

                if (input.length > 0) {
                    input.checkbox(scope.value ? 'check' : 'uncheck');
                    input.on('change', function () {
                        skipIt = true;
                        if (scope.value !== input[0].checked) {
                            scope.$apply(function () {
                                scope.value = input[0].checked;
                            });
                        }
                        skipIt = false;
                    });
                }

                var unWatch1 = scope.$watch('cbdisabled', function (newValue) {
                    input[0].disabled = newValue;
                    input.checkbox({});
                });

                var unWatch2 = scope.$watch('value', function (newValue, oldValue) {
                    if (newValue === oldValue) return;
                    if (!skipIt) {
                        input.checkbox(newValue ? 'check' : 'uncheck');
                    }
                }, true);

                scope.$on("$destroy", function () {
                    unWatch1();
                    unWatch2();
                    input.off('change');
                });
            },
            template: '<div class="checkbox vui-checkbox">' +
                        '<input type="checkbox" ng-disabled="cbdisabled" ng-model="value" />' +
                        '<label ng-bind="text" ng-disabled="cbdisabled"></label>' +
                      '</div>'
        };
    }
]);