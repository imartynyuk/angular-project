;(function(){
    'use strict';
    
    angular
        .module('app.user')
        .service('userService', userService);
    
    /**
     * Service's dependency injections.
     */
    userService.$inject = [
        '$http',
        '$q',
        '$state',
        '$cookies',
        'llcCahce'
    ];
    
    /**
     * @ngdoc service
     * @name app.user:service#userService
     * 
     * @description
     * This service is used for interaction with 'user' entity.
     * 
     * @param {Object} $http Service.
     * @param {Object} $q Service.
     * @param {Object} $state Service.
     * @param {Object} $cookies Service.
     * @param {Object} llcCache Llc cache service.
     * @returns {Object} UserService service.
     */
    function userService( $http, $q, $state, $cookies, llcCache) {
        var self = this;
        
        /**
         * @ngdoc method
         * @name userService#getUserInfo
         * 
         * @description
         * Returns user info by user ID.
         * 
         * @param {Integer} userId User ID.
         * @returns {Object} Promise.
         */
        self.getUserInfo = function( userId ){
            var deff = $q.defer();
            
            $http({
                method: 'GET',
                url: '/user/' + userId
            })            
            .success(function( response){
                deff.resolve( response );
            })
            .error(function( response, status){
                deff.reject( status );
            });
            
            return deff.promise;
        };
        
        /**
         * @ngdoc method
         * @name userService#getList
         * 
         * @description
         * Returns users list (all users).
         * 
         * @returns {Object} Promise.
         */
        self.getList = function(){
            return $http({
                method: 'GET',
                url: '/users'
            });
        };

        /**
         * @ngdoc method
         * @name userService#editUser
         * 
         * @description
         * Saves user data to the API.
         * 
         * @param {Integer} userId User ID.
         * @param {Object} userData An onject of user data.
         * @returns {Object} Promise.
         */
        self.editUser = function( userId, userData ){
            var deff = $q.defer();
            
            $http({
                method: 'POST',
                url: '/user/' + userId,
                data: userData
            })
            .success(function( response){
                llcCache.remove('users/list');
        
                deff.resolve( response );
            })
            .error(function( response ){
                deff.reject(response);
            });
            
            return deff.promise;
        };
    }
})();