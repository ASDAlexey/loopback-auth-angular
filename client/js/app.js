angular
    .module('app', [
        'ui.router',
        'lbServices'
    ])
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider,
                                                                                    $locationProvider,
                                                                                    $urlRouterProvider) {
        $stateProvider
            .state('add-review', {
                url: '/add-review',
                templateUrl: 'views/review-form.html',
                controller: 'AddReviewController'
            })
            .state('all-reviews', {
                url: '/all-reviews',
                templateUrl: 'views/all-reviews.html',
                controller: 'AllReviewsController'
            })
            .state('edit-review', {
                url: '/edit-review/:id',
                templateUrl: 'views/review-form.html',
                controller: 'EditReviewController'
            })
            .state('delete-review', {
                url: '/delete-review/:id',
                controller: 'DeleteReviewController'
            })
            .state('forbidden', {
                url: '/forbidden',
                templateUrl: 'views/forbidden.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'AuthLoginController'
            })
            .state('logout', {
                url: '/logout',
                controller: 'AuthLogoutController'
            })
            .state('my-reviews', {
                url: '/my-reviews',
                templateUrl: 'views/my-reviews.html',
                controller: 'MyReviewsController',
                authenticate: true
            })
            .state('sign-up', {
                url: '/sign-up',
                templateUrl: 'views/sign-up-form.html',
                controller: 'SignUpController'
            })
            .state('sign-up-success', {
                url: '/sign-up/success',
                templateUrl: 'views/sign-up-success.html'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');
        $urlRouterProvider.otherwise('all-reviews');
    }])
    .run(['$rootScope', '$state', 'Reviewer', function ($rootScope, $state, User) {
        User.getCurrent().$promise.then(function (response) {
            $rootScope.currentUser = {
                id: response.id,
                // tokenId: response.id,
                email: response.email
            };
        });
    }]);
