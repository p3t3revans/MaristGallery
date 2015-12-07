angular.module('MyApp')
  .controller('PictureEditCtrl', ['$scope', '$rootScope', 'Subject', 'Picture', '$routeParams', 'Artist', function ($scope, $rootScope, Subject, Picture, $routeParams, Artist) {
    var promise = Picture.readPicture($routeParams.id);
    promise.then(function (result) {
      $scope.picture = result.data[0];
      $scope.data = {
        availableOptions: [
          { name: 'Work on Paper' },
          { name: 'Sulpture' },
          { name: 'Work on Canvas' },
          { name: 'Photograph' },
          { name: 'Clay' }
        ],
        selectedOption: { name: $scope.picture.medium }
      };
      var newpromise = Subject.getSubject($scope.picture.year);
      newpromise.then(function (result) {
        $scope.dataSubject = result.data;
        for (var i = 0; i < $scope.dataSubject.length; i++) {
          if ($scope.dataSubject[i]._id == $scope.picture.subject) {
            $scope.dataSubject.selectedOption = $scope.dataSubject[i];
            break;
          }
        }
        var enrolled = $scope.picture.year + (7 - $scope.dataSubject.selectedOption.yearLevel);
        var promiseArtist = Artist.getArtist(enrolled);
        promiseArtist.then(function (result) {
          $scope.dataArtist = result.data;
          for (var i = 0; i < $scope.dataArtist.length; i++) {
            if ($scope.dataArtist[i]._id == $scope.picture.artist) {
              $scope.dataArtist.selectedOption = $scope.dataArtist[i];
              break;
            }
          }
        });
      });

    });

    $scope.filterBySubject = function (selection) {
      var enrolled = selection.year + (7 - selection.yearLevel);
      var promiseArtist = Artist.getArtist(enrolled);
      promiseArtist.then(function (result) {
        $scope.dataArtist = result.data;
      });
    };

    $scope.addPicture = function (element) {
      if (element.files && element.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          $('#image').attr("src", e.target.result);
          $scope.picture.picture = e.target.result;
        };
        FR.readAsDataURL(element.files[0]);
      };
    };//closure for addPicture
    
    $scope.update = function () {
      console.log('at the client and about to add the picture \\\(^o^\)/');
      Picture.updatePicture({
        _id: $scope.picture._id,
        year: $scope.picture.year,
        title: $scope.picture.title,
        artist: $scope.dataArtist.selectedOption._id,
        artistName: $scope.dataArtist.selectedOption.name,
        medium: $scope.data.selectedOption.name,
        subject: $scope.dataSubject.selectedOption._id,
        picture: $scope.picture.picture
      });//call the service and pass the base64 string
    };//closure for submitPictue
    
    //closure for controller  
  }]);