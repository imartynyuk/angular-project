;(function(){
    'use strict';
    
    angular
        .module('app.user')
        .service('accessPermissionsService', accessPermissionsService);
    
    /**
     * Service's dependency injections.
     */
    accessPermissionsService.$inject = [
        '$rootScope',
        '$state',
        'authService',
        '$timeout'
    ];

    /**
     * @ngdoc service
     * @name app.user:services#accessPermissionsService
     * 
     * @description
     * Service contains access permissions and rules.
     * Controls access to all pages.
     * 
     * @param {Object} $rootScope Root scope.
     * @param {Object} $state State service.
     * @param {Object} authService Auth service.
     */
    function accessPermissionsService( $rootScope, $state, authService, $timeout) {
        /**
         * @description
         * Checks permisions for certain state.
         * 
         * @private
         * 
         * @param {String} stateName State name to checking.
         * @returns {Boolean} Result of checking.
         */
        function _checkStatePermissions( stateName ){
            if (stateName === 'user.login') {
                if (authService.isAuthorized()) {
                    $state.go('user.all', {
                        page: 1
                    });

                    return false;
                }

                return true;
            }
            
            if (!authService.isAuthorized()) {
                $state.go('user.login');

                return false;
            }

            return true;
        }
        
        // Do checking when user logged out.
        $rootScope.$on('USER_LOGGED_OUT', function(){
            _checkStatePermissions( $state.current.name );
        });
        
        // Do checking when user logged in.
        $rootScope.$on('USER_LOGGED_IN', function(){
           _checkStatePermissions( $state.current.name  );
        });

        // Do checking on state change start.
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            (function(){
                setTimeout(function(){
                    if (!_checkStatePermissions( toState.name )) {
                        e.preventDefault( );
                    }
                });
            })();
        });
    }
})();