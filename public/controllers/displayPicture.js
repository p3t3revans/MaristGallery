angular.module('MyApp')
  .controller('PictureDisplayCtrl', ['$scope', '$rootScope','ListPicture', 'Picture', '$routeParams', function ($scope, $rootScope, ListPicture,  Picture, $routeParams) {
    ListPicture.get({ _id: $routeParams.id }, function (picture) {
      $scope.picture = picture;});
     
    }]);