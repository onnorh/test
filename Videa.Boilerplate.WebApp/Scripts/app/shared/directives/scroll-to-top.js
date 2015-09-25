/*

Scrolls to top of page on click.

*/

window.videaShared.directive('scrollToTop', function () {
    return {restrict: 'A',
        link: function (scope, $elm) {
            $elm.css('cursor', 'pointer');
            $elm.on('click', function () {
                $("body").animate({ scrollTop: 0 }, "fast");
            });
        }
    }
});