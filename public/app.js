angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'ngFileUpload', ])
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/listpictures.html',
        controller: 'ListPictureCtrl'
      })
      .when('/addsubject', {
        templateUrl: 'views/subject.add.html',
        controller: 'SubjectCtrl'
      })
      .when('/addartist', {
        templateUrl: 'views/artist.add.html',
        controller: 'ArtistCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/picture', {
        templateUrl: 'views/picture.html',
        controller: 'PictureCtrl'
      })
      .when('/listpicture', {
        templateUrl: 'views/listpictures.html',
        controller: 'ListPictureCtrl'
      })
      .when('/picture/:id/delete', {
        templateUrl: 'views/listpictures.html',
        controller: 'ListPictureCtrl'
      })
      .when('/picture/:id/edit', {
        templateUrl: 'views/picture.edit.html',
        controller: 'PictureEditCtrl'
      })
      .when('/picture/:id', {
        templateUrl: 'views/displayPicture.html',
        controller: 'PictureDisplayCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);