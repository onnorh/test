(function ($) {
    window.videaShared.factory('SignalrHub', [
        '$log', '$q', function ($log, $q) {

            // use shared connection
            var connection;

            function signalrHub(hubName, options) {
                options = options || {};
                connection = connection || $.hubConnection();
                var hub = connection.createHubProxy(hubName);
                var isConnected;

                if (options.listeners) {
                    angular.forEach(options.listeners, function (fn, event) {
                        hub.on(event, fn);
                    });
                }

                if (options.errorHandler) {
                    connection.error(options.errorHandler);
                }

                this.invoke = function () {
                    var args = Array.prototype.slice.call(arguments, 0);
                    var deferred = $q.defer();
                    hub.promise.done(function () {
                        hub.invoke.apply(hub, args)
                            .done(function () {
                                var defArgs = Array.prototype.slice.call(arguments, 0);
                                deferred.resolve.apply(deferred, defArgs);
                            })
                            .fail(function () {
                                var defArgs = Array.prototype.slice.call(arguments, 0);
                                deferred.reject.apply(deferred, defArgs);
                            });
                    });
                    return deferred.promise;
                };

                this.off = function (eventName, callback) {
                    hub.off(eventName, callback);
                };

                hub.promise = connection.start()
                    .done(function () {
                        isConnected = true;
                    })
                    .fail(function (e) {
                        $log.error(e);
                    });
            }

            return signalrHub;
        }
    ]);
})(jQuery);