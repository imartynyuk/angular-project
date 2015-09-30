;(function(){
    'use strict';
    
    angular
        .module('app')
        .factory('responseInterceptor', responseInterceptor);

    responseInterceptor.$inject = [
        'appConstants'
    ];

    /**
     * @ngdoc service
     * @name app:service#responseInterceptor
     * 
     * @description
     * Used for modifying of API requests, and intercepts API responses.
     * 
     * @param {Object} appConstants Application constants.
     */
    function responseInterceptor( appConstants ) {
        return {
            request: function(config) {
                // Skipping the .html requests (our views).
                if (/.*\.html$/.test( config.url )) {
                    return config;
                }
                
                config.url = appConstants.apiUrl + config.url;
                
                return config;
            },
            responseErro: function( rejection ) {
                //TOD: here will be a code which intercepts API errors.
            }
        };
    }
})();