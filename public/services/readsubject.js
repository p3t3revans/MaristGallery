angular.module('MyApp')
  .factory('ListSubject', ['$resource', function($resource) {
    return $resource('/api/subject/:_id');
  }]);