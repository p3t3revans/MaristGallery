angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap','ngFileUpload',])
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })
      .when('/shows/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl'
      })
            .when('/upload', {
        templateUrl: 'views/upload.html',
        controller: 'MyCtrl'
      })
            .when('/picture', {
        templateUrl: 'views/picture.html',
        controller: 'PictureCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);