;(function(){
    'use strict';
    
    angular
        .module('app.user').config([
            '$stateProvider',
            moduleConfig
        ]);
    
    /**
     * @ngdoc function
     * @name app.user#moduleConfig
     * 
     * @description
     * Used for configuring of app.user module.
     * 
     * @param {Object} $stateProvider State provder service.
     */
    function moduleConfig($stateProvider){
        var viewsBaseUrl = 'js/modules/user/views';

        // User module route rules.
        $stateProvider
            .state('user', {
                url: '/user',
                abstract: true,
                template: '<ui-view></ui-view>'
            })
            .state('user.all', {
                url: 's/page/{page:int}/?order_by/',
                templateUrl: viewsBaseUrl + '/user.list.html',
                controller: 'ListController as lstc'
            })
            .state('user.view', {
                url: '/{userId:int}',
                templateUrl: viewsBaseUrl + '/user.profile.html',
                controller: 'ProfileController as prflc'
            })
            .state('user.edit', {
                url: '/{userId:int}/edit/',
                templateUrl: viewsBaseUrl + '/user.edit.html',
                controller: 'ProfileController as prflc'
            })
            .state('user.login', {
                url: '/login',
                templateUrl: viewsBaseUrl + '/user.login.html',
                controller: 'LoginController as lgnc'
            });
    }
})();