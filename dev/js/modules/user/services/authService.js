;(function(){
    'use strict';
    
    angular
        .module('app.user')
        .service('authService', authService);
    
    /**
     * Service's dependency injections.
     */
    authService.$inject = [
        '$rootScope',
        '$cookies',
        '$state',
        '$http',
        '$q'
    ];

    /**
     * @ngdoc service
     * @name app.user:services#authService
     * 
     * @description
     * Service is responsible for authentication and authorization of user.
     * Also it contains session information about authorized user 
     * (user info, auth token, etc.).
     * 
     * @param {Object} $rootScope Root scope.
     * @param {Object} $cookies Cookies service.
     * @param {Object} $state State service.
     * @param {Object} $http Http service.
     * @param {Object} $q Defer service.
     */
    function authService($rootScope, $cookies, $state, $http, $q) {
        var self = this;
        
        /**
         * @ngdoc property
         * @name authService#userInfo
         * 
         * @description
         * Current (logged) user profile information.
         */
        self.userInfo = false;
        
        /**
         * @ngdoc property
         * @name authService#accessToken
         * 
         * @description
         * Current user access token value.
         * Used for indicating of user's auth status.
         */
        self.accessToken = $cookies.get('llc_access_token');
        
        /**
         * @ngdoc method
         * @name authService#isLogged
         * 
         * @description
         * Used for determining of user's auth status.
         */
        self.isAuthorized = function(){
            return !!self.accessToken;
        };
        
        /**
         * @ngdoc method
         * @name authService#getUserName
         * 
         * @description
         * Used for determining of user's auth status.
         */
        self.getUserName = function(){
            return self.userInfo.name;
        };
        
        /**
         * @ngdoc method
         * @name authService#logOut
         * 
         * @description
         * Logout user and clears of all user info.
         */
        self.logOut = function() {
            // Clears user data.
            self.userInfo = false;
            self.accessToken = false;

            // Removes auth token from cookies.
            $cookies.remove('llc_access_token');
            
            $rootScope.$broadcast('USER_LOGGED_OUT');
        };
        
        /**
         * @ngdoc method
         * @name authService#login
         * 
         * @description
         * Logout user and clears of all user info.
         * 
         * @param {String} userLogin User login.
         * @param {String} password User password.
         */
        self.login = function( userLogin, password){
            var deff = $q.defer();
            
            $http({
                method: 'POST',
                url: '/user/login',
                data: {
                    user_login: userLogin,
                    user_password: password
                }
            }).success(function( response, status ){
                self.userInfo = response.profileData;
                self.accessToken = response.access_token;
                
                $cookies.put('llc_access_token', self.accessToken);
                $rootScope.$broadcast('USER_LOGGED_OUT');

                deff.resolve(response);
            })
            .error(function(response, status){
                deff.reject( status);
            });
            
            return deff.promise;
        };
        
        if (self.accessToken) {
            $http({
                method: 'POST',
                url: '/user/me'
            }).success(function( response, status ){
                self.userInfo = response.profileData;
            });
        }
    }
})();