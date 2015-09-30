;(function(){
    'use strict';
    
    angular
        .module('app.user')
        .controller( 'ProfileController', ProfileController );
    
    /**
     * Controller's dependency injections.
     */
    ProfileController.$inject = [
        '$scope',
        '$stateParams',
        '$window',
        '$state',
        'userService'
    ];

    /**
     * @ngdoc controller
     * @name app.user:controllers#ProfileController
     * 
     * @description
     * Responsible for user profile page and user details page. 
     * Contains logic of management and viewing of user account.
     * 
     * @param {Object} $scope Scope.
     * @param {Object} $stateParams State params service.
     * @param {Object} $window Window service
     * @param {Object} $state State service.
     * @param {Object userService User serivce.
     */
    function ProfileController($scope, $stateParams, $window, $state, userService ) {
        var self = this;
        
        /**
         * @ngdoc property
         * @name ProfileController#userInfo
         * 
         * @description
         * Contains selected user information.
         */
        self.userInfo = {
            name: '',
            login: '',
            email: ''
        };
        
        /**
         * @ngdoc property
         * @name ProfileController#userId
         * 
         * @description
         * Contains selected user id.
         */
        self.userId = $stateParams.userId;
        
        /**
         * @ngdoc property
         * @name ProfileController#currUserName
         * 
         * @description
         * Preserves selected user name, will be shown as page title.
         */
        self.currUserName = false;
        
        /**
         * @ngdoc property
         * @name ProfileController#dataSaved
         * 
         * @description
         * Flag which indicates that user data was saved succesfully.
         * Used for showing success message.
         */
        self.dataSaved = false;
        
        /**
         * @ngdoc method
         * @name ProfileController#saveUserData
         * 
         * @description
         * Checks the form, and saves user information if no errors.
         */
        self.saveUserData = function() {
            // Validates data.
            if (!$scope.editForm.$valid) {
                return;
            }
            
            userService
                .editUser( self.userId, self.userInfo )
                .then(function( response ){
                    // Switch on success indicator.
                    self.dataSaved = true;
                    
                    // Changing page title with new user name.
                    self.currUserName = self.userInfo.name;
                        
                    setTimeout(function(){
                        self.dataSaved = false;

                        $scope.$$phase || $scope.$apply();
                    }, 3000);
                });
        };

        // Getting and filling initial user profile data.
        userService
            .getUserInfo( self.userId )
            .then(function( response ){
                self.userInfo = response;
                self.currUserName = self.userInfo.name;
            }, function( status ){
                // This was happening when user doesn't exist.
                // Redirects to users page.
                if (status === 404) {
                    $state.go('user.all', {
                        page: 1
                    });
                }
            });
    }
})();