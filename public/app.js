angular.module('MyApp', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap', 'ngFileUpload', ])
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'views/picture.list.html',
        controller: 'ListPictureCtrl'
      })
      .when('/addsubject', {
        templateUrl: 'views/subject.add.html',
        controller: 'SubjectCtrl'
      })
      .when('/listsubject', {
        templateUrl: 'views/subject.list.html',
        controller: 'ListSubjectCtrl'
      })
      .when('/addartist', {
        templateUrl: 'views/artist.add.html',
        controller: 'ArtistCtrl'
      })
      .when('/listartist', {
        templateUrl: 'views/artist.list.html',
        controller: 'ListArtistCtrl'
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
        templateUrl: 'views/picture.list.html',
        controller: 'ListPictureCtrl'
      })
      .when('/picture/:id/delete', {
        templateUrl: 'views/picture.list.html',
        controller: 'ListPictureCtrl'
      })
      .when('/picture/:id/edit', {
        templateUrl: 'views/picture.edit.html',
        controller: 'PictureEditCtrl'
      })
      .when('/picture/:id', {
        templateUrl: 'views/picture.display.html',
        controller: 'PictureDisplayCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);