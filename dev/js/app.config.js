;(function(){
    'use strict';

    angular
        .module('app')
        .config([
            '$locationProvider',
            '$urlRouterProvider',
            '$httpProvider',
            moduleConfig
        ]);
    
    /**
     * @ngdoc function
     * 
     * @description
     * Used for configuring of app module.
     * 
     * @param {Object} $locationProvider Location provider.
     * @param {Object} $urlRouterProvider Url router provider.
     * @param {Object} $httpProvider Http provider.
     */
    function moduleConfig( $locationProvider, $urlRouterProvider, $httpProvider){
        $locationProvider.html5Mode( true );
        
        $httpProvider.interceptors.push('responseInterceptor');
        
        // TODO: it's just a temporary default route. 
        // Can be changed  in the future.
        $urlRouterProvider.otherwise("/users/page/1/");
    }
})();
    

