window.videaShared.factory('preferencesService', ['$http', function ($http) {
    var getPreferences = function () {
        return $http.get('/Sellers/Preferences/GetPreferences');
    }

    var getPreferencesWithSearchList = function () {
        return $http.get('/Sellers/Preferences/GetPreferencesWithSearchList');
    }

    return {
        getPreferences: getPreferences,
        getPreferencesWithSearchList: getPreferencesWithSearchList
    }
}]);
