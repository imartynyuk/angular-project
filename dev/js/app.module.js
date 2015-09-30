;(function(){
    'use strict';
    
    /**
     * @ngdoc module
     * @name app
     * 
     * @requires ui.router
     * @requires app.apiMocks
     * @requires app.user
     * 
     * @description
     * Common application module.
     */
    angular
        .module('app', [
            'ui.router',
            'app.apiMocks',
            'app.user'
        ]);
})();