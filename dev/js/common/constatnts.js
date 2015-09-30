;(function(){
    'use strict';
    
    /**
     * @ngdoc constant
     * @name app:constants#appConstants
     * 
     * @description
     * Contains common application constant settings.
     */
    angular
        .module('app')
        .constant('appConstants', {
            // Api server url.
            apiUrl: 'http://example.com',

            // Standard amount of items which shows per page.
            defPerPage: 25
        });
})();