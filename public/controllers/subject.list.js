angular.module('MyApp')
  .controller('ListSubjectCtrl', ['$scope', 'Subject', function ($scope, Subject) {

    // need to add an update subject screen and link to it
         var thisday = new Date();
    // need to add an update subject screen and link to it
    $scope.year = {
      availableOptions: [
        { year: 2011 },
        { year: 2012 },
        { year: 2013 },
        { year: 2014 },
        { year: 2015 },
        { year: 2016 },
        { year: 2017 },
        { year: 2018 },
        { year: 2019 },
        { year: 2020 },
        { year: 2021 }
      ],
      selectedOption: { year: thisday.getFullYear() } //This sets the default value of the select in the ui
    };   
     
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

    $scope.filterByYear = function (selection) {
      var enrolled = selection.year;
      var promiseSubject = Subject.getSubject(enrolled);
      promiseSubject.then(function (result) {
        $scope.subjects = result.data;
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