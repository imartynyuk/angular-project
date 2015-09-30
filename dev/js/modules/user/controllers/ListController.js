;(function(){
    'use strict';
    
    angular
        .module('app.user')
        .controller( 'ListController', ListController );

    /**
     * Controller's dependency injections.
     */
    ListController.$inject = [
        '$stateParams',
        '$state',
        'llcCahce',
        'userService',
        'appConstants'
    ];
    
    /**
     * @ngdoc controller
     * @name app.user:controllers#ListController
     * 
     * @description
     * Responsible for 'All users' page.
     * 
     * @param {Object} $stateParams State params service.
     * @param {Object} $state State service.
     * @param {Object} llcCahce Application cache servie.
     * @param {Object} userService User service.
     * @param {Object} appConstants Application constants.
     */
    function ListController($stateParams, $state,  llcCahce, userService, appConstants) {
        var self = this;
        
        /**
         * @ngdoc property
         * @name ListController#usersList
         * 
         * @description
         * Contains list of users.
         */
        self.usersList = [];
        
        /**
         * @ngdoc property
         * @name ListController#currPage
         * 
         * @description
         * Current page number.
         */
        self.currPage = $stateParams.page || 1;
        
        /**
         * @ngdoc property
         * @name ListController#perPage
         * 
         * @description
         * Amount of items showed per page.
         */
        self.perPage = appConstants.defPerPage;
        
        /**
         * @ngdoc property
         * @name ListController#orderFilters
         * 
         * @description
         * Allowed user's ordering filters.
         */
        self.orderFilters = [{
            'fieldKey': 'name',
            'label': 'Name'
        }, {
            'fieldKey': 'login',
            'label': 'Login'
        }, {
            'fieldKey': 'email',
            'label': 'Email'
        }];
    
        /**
         * @ngdoc property
         * @name ListController#reverseResults
         * 
         * @description
         * Flag which indicates that users list should be reversed.
         * ('asc', 'desc' ordering directions).
         */
        self.reverseResults = false;
        
        /**
         * @ngdoc property
         * @name ListController#orderBy
         * 
         * @description
         * User field which used for sorting.
         */
        self.orderBy = self.orderFilters[0].fieldKey;
        
        /**
         * @description
         * Checks order filter for existing.
         * 
         * @private
         * 
         * @param {String} fliterKey Filter name to check.
         * @returns {Boolean} True - if exists, and false otherwise.
         */
        function _isOrderFilterValid( fliterKey ) {
            for (var i in self.orderFilters) {
                if (self.orderFilters[i].fieldKey === fliterKey) {
                    return true;
                }
            }
            
            return false;
        }

        /**
         * @ngdoc method
         * @name ListController#orderByFilter
         * 
         * @description
         * User field which used for sorting.
         * 
         * @param {Object} filter Filter to sorting.
         */
        self.orderByFilter = function( filter ) {
            var orederType = 'asc',
                reverse = self.reverseResults;
        
            // Checking that  filter clicked twice.
            // In this case should change orderBy direction.
            if (self.orderBy === filter.fieldKey ) {
                reverse = !reverse;
            }
            
            // Preparing of textual representation 
            // // of sorting direction for using in the URL.
            if ( reverse ) {
                orederType = 'desc';
            }
            
            // Redirects to state with prepared filtering parameters.
            $state.go('user.all', {
                page: self.currPage,
                order_by: [
                    filter.fieldKey,
                    orederType
                ]
            });
        };
        
        /**
         * @ngdoc method
         * @name ListController#getPageUrlPattern
         * 
         * @description
         * Returns url pattern which can be used for building URL for any pages,
         * includes sorting and filtering parameters.
         */
        self.getPageUrlPattern = function(){
            // We are using a small hack to create url pattern.
            // '777' will be replaced with placehodler below.
            var urlParams = {
                page: 777
            };

            if ( $stateParams.order_by > 0 ) {
                urlParams.oreder_by = self.orderBy;
            }

            return $state
                .href('user.all', urlParams)
                .replace('777', '{%pageNumber%}');
        };
        
        // Getting users list from the API.
        if (llcCahce.get('users/list')) {
            self.usersList = llcCahce.get('users/list');
        } else {
            userService
                .getList()
                .then(function( response ){
                    llcCahce.put('users/list', response.data);

                    self.usersList = response.data;
                });
        }
        
        // Checking and initializing controller values 
        // (filtering and sorting initial values).
        if ( $stateParams.order_by 
                && _isOrderFilterValid( $stateParams.order_by[0] )) {
            self.orderBy = $stateParams.order_by[0];
            
            if ($stateParams.order_by[1] && $stateParams.order_by[1] === 'desc') {
                self.reverseResults = true;
            }
        }
    }
})();