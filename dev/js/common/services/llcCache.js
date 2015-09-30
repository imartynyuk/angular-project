;(function(){
    'use strict';
    
    angular
        .module('app')
        .service('llcCahce', llcCache);
    
    llcCache.$inject = [
        '$cacheFactory'
    ];
    
    /**
     * @ngdoc service
     * @name llcCache
     * 
     * @param {Object} $cacheFactory Cache service.
     * @returns {$cacheFactory} Unique $cacheFactory instance.
     * 
     * @description
     * Provides an unique cache service which used in application.
     */
    function llcCache( $cacheFactory ) {
        return $cacheFactory('llcData');
    }
})();