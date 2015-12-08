angular.module('MyApp')
  .factory('ListPicture', ['$resource', function($resource) {
    return $resource('/api/picture/:_id');
  }]);