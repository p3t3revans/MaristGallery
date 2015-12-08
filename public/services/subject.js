angular.module('MyApp')
  .factory('Subject', ['$http', '$location', '$alert', function ($http, $location, $alert) {
    return {
      addSubject: function (subject) {
        return $http.post('/api/subject', subject)
          .success(function () {
            $location.path('/subject');

         /*   $alert({
              title: 'Congratulations!',
              content: 'Your subject has been saved.',
              placement: 'top-right',
              type: 'success',
              duration: 3
            });*/
          })
          .error(function (response) {
            $alert({
              title: 'Error!',
              content: 'failed to add subject',
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
          });
      },
      updateSubject: function (subject) {
        return $http.put('/api/subject/:id', subject)
          .success(function () {
            $location.path('/subject/' + subject._id);

         /*   $alert({
              title: 'Congratulations!',
              content: 'Your subject has been updated.',
              placement: 'top-right',
              type: 'success',
              duration: 3
            });*/
          })
          .error(function (response) {
            $alert({
              title: 'Error!',
              content: 'failed to update subject',
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
          });
      },
      getSubject: function (subject) {
        return $http.get('/api/subject/?', {params:{"year": subject}})
          .success(function (response) {
           //$location.path('/subject/' + subject._id);

      /*      $alert({
              title: 'Congratulations!',
              content: 'Your subject has been read.',
              placement: 'top-right',
              type: 'success',
              duration: 3
            });*/
          })
          .error(function (response) {
            $alert({
              title: 'Error!',
              content: 'failed to read subject',
              placement: 'top-right',
              type: 'danger',
              duration: 3
            });
          });
      },
      deletePicture: function (subject) {
        return $http.delete('/api/subject/'+ subject._id);
      }

    };
  }]);
  
      