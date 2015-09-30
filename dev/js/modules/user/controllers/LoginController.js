;(function(){
    'use strict';
    
    angular
        .module('app.user')
        .controller( 'LoginController', LoginController );
    
    /**
     * Controller's dependency injections.
     */
    LoginController.$inject = [
        '$state',
        'authService'
    ];
    
    /**
     * @ngdoc controller
     * @name app.user:controllers#LoginController
     * 
     * @description
     * Responsible for 'Login' page.
     * 
     * @param {Object} $state State serivce.
     * @param {Object} authService User auth serivce.
     */
    function LoginController( $state, authService) {
        var self = this;
        
        /**
         * @ngdoc property
         * @name LoginController#loginData
         * 
         * @description
         * User login data. Used for authorisation.
         */
        self.loginData = {
            userLogin: '',
            userPassword: ''
        };

        /**
         * @ngdoc property
         * @name LoginController#authFailed
         * 
         * @description
         * Flag which indicates that auth was failed.
         * Used for displaying failed message.
         */
        self.authFailed = false;

        self.login = function(){
            authService
                .login( self.loginData.userLogin, self.loginData.userPassword)
                .then(function(){
                    self.authFailed = false;
            
                
                    $state.go('user.all', {
                        page: 1
                    });
                }, function(status){
                    if (status === 401) {
                        self.authFailed = true;
                    }
                });
        };
    }
})();