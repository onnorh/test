// register the videaModule as a service

angular.module('videaUtil', ['videaRequestNotify'])
    .factory('isValidDate',
    ['$filter',
        function ($filter) {

            return function (dateString) {
                dateString = $filter('date')
                (dateString, 'MM/dd/yyyy');

                if (!dateString)
                    return false;

                // First check for the pattern
                if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
                    return false;

                // Parse the date parts to integers
                var parts = dateString.split("/");
                var day = parseInt(parts[1], 10);
                var month = parseInt(parts[0], 10);
                var year = parseInt(parts[2], 10);

                // Check the ranges of month and year
                if (year < 1000 || year > 3000 || month == 0 || month > 12)
                    return false;

                var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

                // Adjust for leap years
                if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                    monthLength[1] = 29;

                // Check the range of the day
                return day > 0 && day <= monthLength[month - 1];

            };
        }
    ])

    .service('authenticationManagerService', [function () {
        var timeoutFunction = null;

        var refreshTimeout = function () {
            timeoutFunction();
        }

        var setTimeout = function (newTimeoutFunction) {
            timeoutFunction = newTimeoutFunction;
        }

        return {
            refreshTimeout: refreshTimeout,
            setTimeout: setTimeout
        }
    }])

    .factory('httpInterceptor',
    ['$q', '$log', '$injector', 'requestNotificationChannel',
        function ($q, $log, $injector, requestNotificationChannel) {

            return {
                // Request Success
                'request': function (config) {
                    config.headers['XSRFToken'] = angular.element('meta[name=XSRFToken]').attr("content");

                    // send a notification requests are complete
                    requestNotificationChannel.requestsInFlight++;
                    return config;
                },

                // Request Error
                'requestError': function (rejection) {
                    $log.error(rejection);

                    if (requestNotificationChannel.requestsInFlight > 0)
                        requestNotificationChannel.requestsInFlight--;

                    return $q.reject(rejection);
                },

                // Response Success
                'response': function (response) {

                    if (requestNotificationChannel.requestsInFlight > 0)
                        requestNotificationChannel.requestsInFlight--;

                    return response;
                },

                // Response Error
                'responseError': function (rejection) {
                    $log.error(rejection);

                    if (requestNotificationChannel.requestsInFlight > 0)
                        requestNotificationChannel.requestsInFlight--;

                    return $q.reject(rejection);
                }
            };
        }])

    //For use when we are dynamically determining the columns in a grid.
    //In this case we can't use the normal {{value | filter}} syntax, so instead
    //we can do {{value | formatByType:typeString}}.
    //{{ value | formatByType:date:M/d/yy }}
    //{{ value | formatByType:currency:dropChange }} will format as $xxx,xxx.xx, otherwise $xxx,xxx
    .filter('formatByType', ['$filter', function ($filter) {
        var hash = {
            'currency': function (val, format) {//delegate to angularjs' built-in filter as base
                var toReturn = $filter('currency')(val, '$');

                if (format && format.toLowerCase() === 'dropchange') {
                    toReturn = toReturn.split('.')[0];
                }

                return toReturn;
            },
            'currencynosign': function (val, format) {//delegate to angularjs' built-in filter as base
                var toReturn = $filter('currency')(val, '');

                if (format && format.toLowerCase() === 'dropchange') {
                    toReturn = toReturn.split('.')[0];
                }

                return toReturn;
            },
            'whole-number-or-dashes': function (val, format) {//delegate to angularjs' built-in filter as base
                if (val === '--') return val;
                var toReturn = $filter('currency')(val, '');

                toReturn = toReturn.split('.')[0];

                return toReturn;
            },
            'currencyrounduptonextdollar': function (val, format){//delegate to angularjs' built-in filter as base
                var toReturn = $filter('currency')(Math.ceil(val), '$');
                if (format && format.toLowerCase() === 'dropchange') {
                    toReturn = toReturn.split('.')[0];
                }
                return toReturn;
            },
            'add-percentage-symbol': function (val) {
                var toReturn = val.toString() + '%';
                return toReturn;
            },
            'percentage': function (val) {
                var toReturn = val.toFixed(2).toString() + '%';
                return toReturn;
            },
            'number': function (val) {
                var toReturn = $filter('number')(val);
                return toReturn;
            },
            'date': function (val, format) {
                return $filter('date')(val, format);
            },
            'yn': function (val) {
                return val === true ? "Y" : "N";
            },
            'notprovided': function (val) {
                if (val === "0" || val === "" || val === 0 || val === null || val === "$0.00") {
                    return "Not Provided";
                }
                return val;
            },
            // this filter just returns an empty string
            'empty': function () {
                return '';
            },
            'rating': function(val) {
                return val.toFixed(2);
            },
            'array': function (val, separator) {
                if (angular.isArray(val)) {
                    separator = separator || '';
                    return val.join(separator);
                }
                return val;
            }
        };

        return function (val, type, arg3, arg4) {
            if (typeof type === 'undefined' || !type) {
                return val;
            }

            var typeArgs = null;
            var paramSeparator = type.indexOf(':');
            if (paramSeparator > 0) {
                typeArgs = type.substring(paramSeparator + 1);
                type = type.substring(0, paramSeparator);
            }

            if (hash[type] !== undefined) {
                return hash[type](val, typeArgs);
            } else {
                return val;
            }
        };
    }])

    .filter('max', function () {
        return function (input, iterator) {
            var max = null, maxComputed = -Infinity;
            if (input && iterator) {
                angular.forEach(input, function (item) {
                    var computed = iterator(item);
                    if (computed > maxComputed) {
                        max = item;
                        maxComputed = computed;
                    }
                });
            }
            return max;
        };
    })

    .filter('min', function () {
        return function (input, iterator) {
            var min = null, minComputed = Infinity;
            if (input && iterator) {
                angular.forEach(input, function (item) {
                    var computed = iterator(item);
                    if (computed < minComputed) {
                        min = item;
                        minComputed = computed;
                    }
                });
            }
            return min;
        };
    })

    .filter('findFirst', function () {
        return function (arr, predicate) {
            if (!arr || !predicate || typeof predicate !== 'function') {
                return null;
            }

            for (var i = 0, j = arr.length; i < j; i++) {
                var element = arr[i];
                if (predicate(element)) {
                    return element;
                }
            }

            return null;

        }
    })

    .filter('urlEncode', [function() {
            return window.encodeURIComponent;
        }
    ])
;

