angular.module('MyApp')
  .factory('Artist', ['$http', '$location', '$alert', function ($http, $location, $alert) {
    return {
      addArtist: function (artist) {
        return $http.post('/api/artist', artist)
          .success(function () {
            $location.path('/artist');

            /*     $alert({
                   title: 'Congratulations!',
                   content: 'Your artist has been saved.',
                   placement: 'top-right',
                   type: 'success',
                   duration: 3
                 });*/
          })
          .error(function (response) {
            $alert({
              title: 'Error!',
              content: 'failed to add artist',
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
          });
      },
      updateArtist: function (artist) {
        return $http.put('/api/artist/:id', artist)
          .success(function () {
            $location.path('/artist/' + artist._id);

            /*        $alert({
                      title: 'Congratulations!',
                      content: 'Your artist has been updated.',
                      placement: 'top-right',
                      type: 'success',
                      duration: 3
                    });*/
          })
          .error(function (response) {
            $alert({
              title: 'Error!',
              content: 'artist failed to update',
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
          });
      },
      getArtist: function (data) {
        return $http.get('/api/artist/?', { params: { "yearEnrolled": data } })
          .success(function (response) {
            //$location.path('/subject/' + subject._id);
            /*
                        $alert({
                          title: 'Congratulations!',
                          content: 'Your artist has been read.',
                          placement: 'top-right',
                          type: 'success',
                          duration: 3
                        });*/
          })
          .error(function (response) {
            $alert({
              title: 'Error!',
              content: 'artist failed to read',
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
          });
      },
      getActiveArtist: function (data) {
        return $http.get('/api/artist/?', { params: { "yearEnrolled": data ,"active" : true }})
          .success(function (response) {
            //$location.path('/subject/' + subject._id);
            /*
                        $alert({
                          title: 'Congratulations!',
                          content: 'Your artist has been read.',
                          placement: 'top-right',
                          type: 'success',
                          duration: 3
                        });*/
          })
          .error(function (response) {
            $alert({
              title: 'Error!',
              content: 'artist failed to read',
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
          });
      }
    };
  }]);
  
      