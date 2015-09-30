;(function(){
    'use strict';
    
    /**
     * @ngdoc module
     * @name app.user
     * 
     * @requires ui.router
     * @requires ngCookies
     * 
     * @description
     * Contains logic of working with user features.
     */
    angular
        .module('app.user', [
            'ui.router',
            'ngCookies'
        ]);
        
    angular
        .module('app.user')
        .run([
            'authService',
            'accessPermissionsService',
            moduleRun
        ]);
        
    function moduleRun(authService, accessPermissionsService) {
        
    }
})();