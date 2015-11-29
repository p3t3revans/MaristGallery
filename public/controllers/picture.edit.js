angular.module('MyApp')
  .controller('PictureEditCtrl', ['$scope', '$rootScope', 'ListPicture', 'Picture', '$routeParams', function ($scope, $rootScope, ListPicture, Picture, $routeParams) {
    ListPicture.get({ _id: $routeParams.id }, function (picture) {
      $scope.picture = picture;
      $scope.data = {
        availableOptions: [
          { name: 'Work on Paper' },
          { name: 'Sulpture' },
          { name: 'Work on Canvas' },
          { name: 'Photograph' },
          { name: 'Clay' }
        ],
        selectedOption: { name: $scope.picture.medium}
      };
    });


 
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
        title: $scope.picture.title,
        artist: $scope.picture.artist,
        medium: $scope.data.selectedOption.name,
        picture: $scope.picture.picture
      });//call the service and pass the base64 string
    };//closure for submitPictue
    
    //closure for controller  
  }]);