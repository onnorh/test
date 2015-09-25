window.videaShared.controller('AuthenticationManagerController', [
    '$scope', '$http', '$timeout', 'authenticationManagerService',
    function ($scope, $http, $timeout, authenticationManagerService) {
        $scope.modalShown = false;
        $scope.authWarning = 0;

        $scope.showTimeoutModal = function () {
            $scope.modalShown = true;
        }

        $scope.hideTimeoutModal = function () {
            $scope.modalShown = false;
        }

        var authTimeout, minutesBeforeWarning, authWarningTimer, authTimeoutTimer;
        var timeOnPageLoad = new Date();

        function showAuthWarning() {
            $scope.showTimeoutModal();
        }

        function redirectToLoginPage() {
            $http.post('/Account/LogOff')
                .success(function () {
                    var redirectUrl = window.location.pathname + window.location.search + window.location.hash;
                    if (redirectUrl.length > 0) {
                        redirectUrl = '?ReturnUrl=' + encodeURIComponent(redirectUrl);
                    }
                    window.location = '/Account/Login' + redirectUrl;
                });
        }

        $scope.resetTimeout = function () {
            // Clear the timeout timer
            if (authTimeoutTimer != null) {
                $timeout.cancel(authTimeoutTimer);
            }

            // Clear the warning timer
            if (authWarningTimer != null) {
                $timeout.cancel(authWarningTimer);
            }

            // Reset the time on page load
            timeOnPageLoad = new Date();

            // Reset the authentication warning and timeout timers
            authWarningTimer = $timeout(showAuthWarning, minutesBeforeWarning * 60 * 1000);
            authTimeoutTimer = $timeout(redirectToLoginPage, parseInt(authTimeout) * 60 * 1000);

            $scope.hideTimeoutModal();
        }

        function authExpired() {
            var currentTime = new Date();

            // Time authentication should expire
            var authExpiration = timeOnPageLoad.setMinutes(timeOnPageLoad.getMinutes() + parseInt(authTimeout));

            return Date.parse(currentTime) > authExpiration;
        }

        $scope.refreshTimeout = function () {
            if (!authExpired()) {
                $http.post('/Account/RefreshAuthenticatonTimeout')
                    .success(function () {
                        $scope.resetTimeout();
                    });
            } else {
                redirectToLoginPage();
            }
        }

        authenticationManagerService.setTimeout($scope.refreshTimeout);

        $scope.showAuthWarning = showAuthWarning;
        $scope.redirectToLoginPage = redirectToLoginPage;

        $scope.init = function (config) {
            authTimeout = config.authTimeout;
            $scope.authWarning = config.authWarning;
            minutesBeforeWarning = (parseInt(authTimeout) - parseInt($scope.authWarning));
            authWarningTimer = $timeout($scope.showAuthWarning, minutesBeforeWarning * 60 * 1000);
            authTimeoutTimer = $timeout($scope.redirectToLoginPage, parseInt(authTimeout) * 60 * 1000);
        };
    }
]);