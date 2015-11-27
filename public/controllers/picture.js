angular.module('MyApp')
  .controller('PictureCtrl', ['$scope', '$rootScope', 'Picture', function ($scope, $rootScope, Picture) {

    $scope.data = {
      availableOptions: [
        { id: '1', name: 'Work on Paper' },
        { id: '2', name: 'Sulpture' },
        { id: '3', name: 'Work on Canvas' },
        { id: '4', name: 'Photograph' },
        { id: '5', name: 'Clay' }
      ],
      selectedOption: { id: '1', name: 'Work on Paper' } //This sets the default value of the select in the ui
    };

    $scope.addPicture = function (element) {
      if (element.files && element.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          $('#img').attr("src", e.target.result);//what is this might not need to do the folloeing step
          // $('#base').text(e.target.result);
          $scope.picture.picture = e.target.result;//.toString('base64');
          //fileNameS = element.files[0].name;
        };
        FR.readAsDataURL(element.files[0]);
      };
    };//closure for addPicture
    
    $scope.submitPicture = function () {
      //   var picture = new Picture();
      console.log('at the client and about to add the picture \\\(^o^\)/');
      //nameS = this.pictureName;
      
      Picture.addPicture({
        title: $scope.picture.title,
        artist: $scope.picture.artist,
        picture: $scope.picture.picture,
        medium: $scope.data.selectedOption.name
      });//call the service and pass the base64 string
    };//closure for submitPictue
    
    //closure for controller  
  }]);
  
  