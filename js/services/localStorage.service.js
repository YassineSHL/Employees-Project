angular.module('myApp')
    .factory('LocalStorageService', function($window) {
        return {
            put: function(key, value) {
                $window.localStorage[key] = _.isObject(value) ? JSON.stringify(value) : value;
            },
            get: function(key) {
                try {
                    return JSON.parse($window.localStorage[key]);
                } catch (e) {
                    return $window.localStorage[key];
                }

            },
            delete: function(key) {
                delete $window.localStorage[key];
            }
        }
    });