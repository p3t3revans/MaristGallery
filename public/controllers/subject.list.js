angular.module('MyApp')
  .controller('ListSubjectCtrl', ['$scope', 'Subject', function ($scope, Subject) {


    $scope.headingTitle = 'Top 12 Picture';

    var today = new Date();
    //var dd = today.getDate();
    //var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    //var subjectForDropDown = [];
    var promise = Subject.getSubject(yyyy);
    promise.then(function (result) {
      $scope.subjects = result.data;

    });

    $scope.remove = function (subject) {
      Subject.deletePicture(subject).success(function () {
        var newpromise = Subject.getSubject(yyyy);
        newpromise.then(function (result) {
          $scope.subjects = result.data;

        });
      });
    };
    /*
        $scope.find = function () {
          Subject.readSubject(function (pictures) {
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
        };*/
  }]);