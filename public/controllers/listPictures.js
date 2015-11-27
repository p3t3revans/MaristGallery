angular.module('MyApp')
  .controller('ListPictureCtrl', ['$scope', 'ListPicture',  'DeletePicture',  function ($scope, ListPicture,  DeletePicture) {

    $scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'];

    $scope.mediums = ['Work on Paper', 'Work on Canvas', 'Drawing', 'Photograph', 'Clay',
      'Sculpture'];

    $scope.headingTitle = 'Top 12 Picture';

    $scope.find = function () {
      ListPicture.query(function (pictures) {
        $scope.pictures = pictures;
      });
    };
    // $scope.pictures = Picture.query();{ id: picture._id }
    $scope.remove = function (picture) {
      DeletePicture.deletePicture({ id: picture._id }).success(function () {
        ListPicture.query(function (pictures) {
          $scope.pictures = pictures;
        });
      });
    };


    $scope.filterByMedium = function (medium) {
      $scope.pictures = ListPicture.query({ medium: medium });
      $scope.headingTitle = medium;
    };

    $scope.filterByAlphabet = function (char) {
      $scope.pictures = ListPicture.query({ title: char });
      $scope.headingTitle = char;
    };
  }]);