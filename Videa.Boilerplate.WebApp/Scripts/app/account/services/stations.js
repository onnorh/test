window.videaApp.service('StationsRepository', ['$q', function ($q) {

    this.getAll = function (currentPage, itemsPerPage) {
        // TODO: implement paging
        var deferred = $q.defer();
        var stations = PreloadStore.getAndRemove('stations');
        deferred.resolve(stations);
        return deferred.promise;
    };
}]);