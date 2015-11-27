angular.module('MyApp')
  .factory('Picture', ['$http', '$location', '$alert', function ($http, $location, $alert) {
    return {
      addPicture: function (picture) {
        return $http.post('/api/picture', picture)
          .success(function () {
            $location.path('/picture');

            $alert({
              title: 'Congratulations!',
              content: 'Your picture has been saved.',
              placement: 'top-right',
              type: 'success',
              duration: 3
            });
          })
          .error(function (response) {
            $alert({
              title: 'Error!',
              content: response.data,
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
          });
      },
      updatePicture: function (picture) {
        return $http.put('/api/picture/:id', picture)
          .success(function () {
            $location.path('/picture/' + picture._id);

            $alert({
              title: 'Congratulations!',
              content: 'Your picture has been updated.',
              placement: 'top-right',
              type: 'success',
              duration: 3
            });
          })
          .error(function (response) {
            $alert({
              title: 'Error!',
              content: response.data,
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
          });
      }

    };
  }]);
  
      