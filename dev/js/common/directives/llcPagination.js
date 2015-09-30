;(function(){
    'use strict';
    
    angular
        .module('app')
        .directive('llcPagination', llcPagination);

    /**
     * @ngdoc directive
     * @name llcPagination
     * @restrict A
     * 
     * @description
     * Creates paginated data from array of items 
     * and renders them as HTML pagination using template.
     */
    function llcPagination() {
        return {
            restrict: 'A',
            templateUrl: 'js/common/views/directives/llcPagination.html',
            replace: true,
            scope: {
                items: '=',
                perPage: '='
            },
            link: link
        };

        function link($scope, elem, attr){
            /**
             * @ngdoc property
             * @name llcPagination#pages
             * 
             * @description
             * Contains prepared array of pages.
             */
            $scope.pages = [];
            
            // Watching on changing items.
            $scope.$watch('items', function(newVal, oldVal){
                if (newVal === oldVal && $scope.pages.length !== 0) {
                    return;
                }
                
                $scope.pages = getPaginated(
                    newVal, $scope.perPage, attr.currPage, attr.urlPattern
                );
            });
        }
        
        /**
         * Creates an array of pages which will be used in template.
         * 
         * @param {Array} items An array of total items.
         * @param {Integer} perPage Amount of items per page.
         * @param {Integer} currPage Current page numerb.
         * @param {String} urlPattern An URL pattern, which will be used as href attribute.
         * 
         * @returns {Array} Prepared array of pages.
         */
        function getPaginated(items, perPage, currPage, urlPattern) {
            var totalItems = items.length,
                totalPages = Math.ceil( totalItems / perPage ),
                paginated = [];
        
            for (var i = 1; i <= totalPages; i++) {
                paginated.push({
                    number: i,
                    current: +currPage === i,
                    url: urlPattern.replace('{%pageNumber%}', i)
                });
            }
            
            return paginated;
        }
        
    }
})();