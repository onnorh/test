window.videaApp.controller('ViewStationsController', [
    '$scope', 'StationsRepository',
    function ($scope, stationsRepository) {
        $scope.stations = [];
        $scope.itemsPerPage = 5;
        $scope.currentPage = 1;

        stationsRepository.getAll($scope.currentPage, $scope.itemsPerPage).then(function (data) {
            $scope.stations = data;
            $scope.totalItems = data.length;
        });
    }
]);
