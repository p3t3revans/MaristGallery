angular.module('MyApp')
  .controller('PictureEditCtrl', ['$scope', '$rootScope','ListPicture', 'Picture', '$routeParams', function ($scope, $rootScope, ListPicture,  Picture, $routeParams) {
    ListPicture.get({ _id: $routeParams.id }, function (picture) {
      $scope.picture = picture;});
      
      var pictureString = '';
      var fileNameS = '';
      //var nameS = this.pictureName;//$rootScope.currentUser.email;
/*
      $scope.findById = function (){
               Picture.get({ _id: $routeParams.id }, function(picture) {
              $scope.picture = picture;
             }) };
*/
      $scope.addPicture = function (element) {
        if (element.files && element.files[0]) {
          var FR = new FileReader();
          FR.onload = function (e) {
            $('#image').attr("src", e.target.result);
           // $('#base').text(e.target.result);
           // pictureString = e.target.result;
            $scope.picture.picture = e.target.result;
            fileNameS = element.files[0].name;
          };
          FR.readAsDataURL(element.files[0]);
        };
      };//closure for addPicture
    
      $scope.update = function () {
        //   var picture = new Picture();
        console.log('at the client and about to add the picture \\\(^o^\)/');
       // nameS = this.pictureName;

        Picture.updatePicture({
          _id: $scope.picture._id,
          title: $scope.picture.title,
          artist: $scope.picture.artist,
          medium: $scope.picture.medium,
          picture:  $scope.picture.picture 
        });//call the service and pass the base64 string
      };//closure for submitPictue
    
      //closure for controller  
    }]);