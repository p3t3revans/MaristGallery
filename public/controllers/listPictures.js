angular.module('MyApp')
  .controller('ListPictureCtrl', ['$scope', 'ListPicture', function ($scope, ListPicture) {

    $scope.alphabet = ['0-9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'];

    $scope.medium = ['Work on Paper', 'Work on Canvas', 'Drawing', 'Photograph', 'Clay',
      'Sculpture'];

    $scope.headingTitle = 'Top 12 Picture';

    $scope.find = function () {
      ListPicture.query(function (pictures) {
        $scope.pictures = pictures;
      });
    };
    //$scope.pictures = Picture.query();

    $scope.filterByMedium = function (medium) {
      $scope.pictures = ListPicture.query({ medium: medium });
      $scope.headingTitle = medium;
    };

    $scope.filterByAlphabet = function (char) {
      $scope.pictures = ListPicture.query({ title: char });
      $scope.headingTitle = char;
    };
  }]);