window.videaShared.factory('generalPreferencesService', ['$http', function ($http) {

    var saveProfile = function (profile) {
        var data = profile;
        return $http.post('/UserPreferences/General/SaveProfile', data);
    }

    return {
        saveProfile: saveProfile
    }
}]);
