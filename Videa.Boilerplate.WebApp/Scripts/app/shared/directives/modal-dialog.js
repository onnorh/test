window.videaShared.directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true,
        transclude: true,
        link: function (scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.showModal = function () {
                scope.show = true;
            };
            scope.hideModal = function () {
                scope.show = false;
            };
        },
        templateUrl: '/Scripts/app/shared/templates/modal-dialog.html',
    };
});

