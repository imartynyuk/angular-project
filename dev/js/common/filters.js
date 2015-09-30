;(function(){
    'use strict';
    
    angular
        .module('app')
        .filter('paged', paged);

    function paged() {
        /**
         * @ngdoc filter
         * @name app:filters#paged
         * 
         * @description
         * This filter is used for splicing of array with offset and limit.
         * Usually used for pagination.
         * 
         * @param {Array} input An array of items.
         * @param {Integer} currPage Curr page number.
         * @param {Integer} perPage Items per page.
         * @returns {Array} Spliced array of items (current page items).
         */
        return function(input, currPage, perPage){
            var first = (currPage - 1) * perPage,
                last = first + perPage;
        
            return input.slice(first, last);
        };
    }
})();