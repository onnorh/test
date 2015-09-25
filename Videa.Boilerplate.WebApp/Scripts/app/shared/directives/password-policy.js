window.videaShared.directive('passwordPolicy', ['$http', function ($http) {

    /*ACTUAL POLICY FUNCTION*/   
    var min = 6;
    var max = 50;
    var requiredMatches = 2;
    var patterns = [
        /\d/,
        /[a-zA-Z]/,
        /[\!\@\#\$\%\^\&\*\(\)\_\+]/
    ];

    var isValidPassword = function (username, pass) {
        if (window.videaShared.enablePasswordPolicy == false) return true;
        if (pass.length < min) return false;
        if (pass.length > max) return false;

        var matchCount = 0;
        if (requiredMatches > 0) {
            for (var i = 0, l = patterns.length; i < l; i++) {
                matchCount += patterns[i].test(pass) ? 1 : 0;
            }

            if (matchCount < requiredMatches) return false;
        }

        if (pass.indexOf(username) != -1) return false;

        return true;
    };
    /*ACTUAL POLICY FUNCTION END*/

    return {
        require: 'ngModel',
        link: function (scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                if (newValue != oldValue) {

                    //username without domain of email address
                    var userName = scope.$eval(attrs.passwordPolicy).split("@")[0];

                    c.$setValidity('passwordPolicy', isValidPassword(userName,newValue));
                }
            });
        }
    }
}]);