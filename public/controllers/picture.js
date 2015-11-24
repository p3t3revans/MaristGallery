angular.module('MyApp')
  .controller('PictureCtrl', ['$scope', '$rootScope', 'Picture', function ($scope, $rootScope, Picture) {

    var pictureString = '';
    var fileNameS = '';
    var nameS = this.pictureName;


    $scope.addPicture = function (element) {
      if (element.files && element.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          $('#img').attr("src", e.target.result);//what is this might not need to do the folloeing step
         // $('#base').text(e.target.result);
          pictureString = e.target.result;//.toString('base64');
          fileNameS = element.files[0].name;
        };
        FR.readAsDataURL(element.files[0]);
      };
    };//closure for addPicture
    
    $scope.submitPicture = function () {
      //   var picture = new Picture();
      console.log('at the client and about to add the picture \\\(^o^\)/');
      nameS = this.pictureName;
      
      Picture.addPicture({
        title: fileNameS,
        artist: nameS,
        picture: pictureString
      });//call the service and pass the base64 string
    };//closure for submitPictue
    
    //closure for controller  
  }]);
  
  