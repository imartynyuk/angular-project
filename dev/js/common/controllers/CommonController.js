;(function(){
    'use strict';
    
    angular
        .module('app')
        .controller( 'CommonController', CommonController );

    /**
     * Controller's dependency injections.
     */
    CommonController.$inject = [
        'authService'
    ];
    
    /**
     * @ngdoc controller
     * @name app:controllers#CommonController
     * 
     * @description
     * Contains global logic which can be used in common layout.
     * 
     * @param {Object} authService
     */
    function CommonController(authService) {
        /**
         * @ngdoc property
         * @name CommonController#authService
         * 
         * @description
         * Local link to the authService.
         */
        this.authService = authService;
        
        /**
         * @ngdoc method
         * @name CommonController#logOut
         * 
         * @description
         * Log out user.
         */
        this.logOut = function(){
            authService
                .logOut();
        };
    }
})();