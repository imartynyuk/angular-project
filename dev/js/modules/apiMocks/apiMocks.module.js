;(function(){
    'use strict';
    
    /**
     * @ngdoc module
     * @name app.apiMocks
     * 
     * @requires ngMockE2E
     * 
     * @description
     * This module is used for mocking of API responses.
     */
    angular
        .module('app.apiMocks', [
            'ngMockE2E'
        ]);
    
    angular
        .module('app.apiMocks')
        .run([
            '$httpBackend',
            appRun
        ]);

    /**
     * @ngdoc function
     * @name app.apiMocks#appRun
     * 
     * @description
     * Invoked when application starts.
     * 
     * @param {Object} $httpBackend Http backend service.
     */
    function appRun( $httpBackend ){
        /**
         * Base url to API samples .json files.
         * 
         * @type String
         */
        var apiSamplesUrl = 'js/modules/apiMocks/api-samples';

        /**
         * @ngdoc function
         * @name appRun#_httpRequest
         * 
         * @description
         * Makes HTTP request and gets api sample response from file.
         * 
         * @param {String} method Http method.
         * @param {String} url Second part of the url (will be merged with base samples url).
         * @returns {XMLHttpRequest.response} Content of requested file.
         */
        function _httpRequest(method, url) {
            var request = new XMLHttpRequest();

            request.open(method, apiSamplesUrl + url, false);
            request.send(null);

            return request.response;
        }

        /**
         * Getting all users list.
         */
        $httpBackend.when('GET', /\/users/)
            .respond(function(method, url, data){
                var result = _httpRequest( 'GET', '/users.list.json' );
        
                return [200, result, {}];
            });

        /**
         * Getting certain user information.
         */
        $httpBackend.when('GET', /\/user\/[1-9]+/)
            .respond(function(method, url, data){
                var allUsers = JSON.parse( 
                        _httpRequest( 'GET', '/users.list.json' ) 
                    ),
                    userId = +url.match(/\d+/g)[0];

                for (var i in allUsers) {
                    if (allUsers[i].id === userId) {
                         return [200, allUsers[i], {}]
                    }
                }

                return [404, [], {}]
            });

        /**
         * Getting infromation about current user.
         */
        $httpBackend.when('POST', /\/user\/me/)
            .respond(function(method, url, data){
                var result = _httpRequest( 'GET', '/user.me.json' );

                return [200, result, {}];
            });

        /**
         * Deleting certain user.
         */
        $httpBackend.when('DELETE', /\/user\/[1-9]+/)
            .respond(function(method, url, data){
                return _httpRequest( 'DELETE', '/user.delete.json' );
            });
            
        /**
         * Saving data about certain user.
         */
        $httpBackend.when('POST', /\/user\/[1-9]+/)
            .respond(function(method, url, data){
                var result = _httpRequest( 'GET', '/user.edit.json' );
        
                return [200, result, {}];
            });

        /**
         * Login action.
         */
        $httpBackend.when('POST', /\/user\/login/)
            .respond(function(method, url, data){
                // Hardcoded auth credentials are used only for API simulation.
                var data = JSON.parse(data);
        
                if (data.user_login === 'admin' && data.user_password === 'admin') {
                    var result = _httpRequest( 'GET', '/user.login.json' );
                    
                    return [200, result, {}];
                }
                
                // Unautorized response.
                return [401, result, {}];
            });
            
        /**
         * Logout action.
         */ 
        $httpBackend.when('POST', /\/user\/logout/)
            .respond(function(method, url, data){
                return _httpRequest( 'GET', '/user.logout.json' );
            });

        // Allow loading templates.
        $httpBackend.when('GET', /.*\/views\//).passThrough();
    }
})();