;(function(){
    'use strict';
    
    angular
        .module('app')
        .directive('llcBackButton', llcBackButton);

    /**
     * Directive dependency injections.
     */
    llcBackButton.$inject = [
        '$window'
    ];

    /**
     * @ngdoc directive
     * @name llcBackButton
     * @restrict A
     * 
     * @description
     * Is used for creating back buttons.
     * It's simply redirects to previous state when element was clicked.
     * 
     * @param {Object} $window 
     */
    function llcBackButton($window) {
        return {
            restrict: 'A',
            link: link
        };
        
        function link($scope, elem, attr){
            elem.on('click', function(e){
                e.preventDefault();
                
                $window.history.back();
            });
        }
    }
})();