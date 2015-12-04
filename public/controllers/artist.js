angular.module('MyApp')
  .controller('ArtistCtrl', ['$scope', '$rootScope', 'Artist', function ($scope, $rootScope, Artist) {


    $scope.submitArtist = function () {
      //   var picture = new Picture();
      console.log('at the client and about to add the picture \\\(^o^\)/');
      //nameS = this.pictureName;
      
      Artist.addArtist({
        name: $scope.artist.name,
        description : $scope.artist.description,
        yearEnrolled :$scope.artist.yearEnrolled
      });//call the service and pass the base64 string
    };//closure for submitPictue
    
    //closure for controller  
  }]);
  
  