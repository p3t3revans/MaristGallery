angular.module('MyApp')
  .factory('DeletePicture', ['$http', function ($http) {
    return {
      deletePicture: function (picture) {
        return $http.delete('/api/picture/'+ picture.id);
      }
    };
  }]);