window.videaShared.controller('AutoCompleteController', [
    '$scope', '$rootScope',
    function ($scope, $rootScope) {
        $rootScope.suggestions = [];
        $rootScope.selectedIndex = -1;

        $rootScope.search = function () {
            $rootScope.suggestions = [];
            var myMaxSuggestionListLength = 0;
            for (var i = 0; i < $scope.searchList.length; i++) {
                var searchListItemToLower = angular.lowercase($scope.searchList[i]);
                var ssSearchToLower = angular.lowercase($scope.ssSearch);
                if (searchListItemToLower.indexOf(ssSearchToLower) !== -1) {
                    $rootScope.suggestions.push(searchListItemToLower);
                    myMaxSuggestionListLength += 1;
                    if (myMaxSuggestionListLength == 5) {
                        break;
                    }
                }
            }
        }

        $rootScope.checkKeyDown = function (event) {
            if (event.keyCode === 40) {
                event.preventDefault();
                if ($rootScope.selectedIndex + 1 !== $rootScope.suggestions.length) {
                    $rootScope.selectedIndex++;
                }
            } else if (event.keyCode === 38) {
                event.preventDefault();
                if ($rootScope.selectedIndex - 1 !== -1) {
                    $rootScope.selectedIndex--;
                }
            } else if (event.keyCode === 13) {
                event.preventDefault();
                $rootScope.suggestions = [];
            }
        }

        $rootScope.checkKeyUp = function (event) {
            if (event.keyCode !== 8 || event.keyCode !== 46) {
                if ($scope.ssSearch == "") {
                    $rootScope.suggestions = [];
                }
            }
        }

        $rootScope.assignValue = function (index) {
            $scope.ssSearch = $rootScope.suggestions[index];
            $rootScope.suggestions = [];
        }
    }
]);