angular.module('MyApp')
  .controller('ListArtistCtrl', ['$scope', 'Artist', function ($scope, Artist) {
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
    //  $scope.headingTitle = 'Top 12 Picture';

    var today = new Date();
    //var dd = today.getDate();
    //var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    //var subjectForDropDown = [];
    var promise = Artist.getArtist(yyyy);
    promise.then(function (result) {
      $scope.artists = result.data;

    });

   $scope.filterByYear = function (selection) {
      var enrolled = selection.year;
      var promiseArtist = Artist.getArtist(enrolled);
      promiseArtist.then(function (result) {
        $scope.artists = result.data;
      });
    };

    $scope.remove = function (artist) {
      Artist.deletePicture(artist).success(function () {
        var newpromise = Artist.getArtist(yyyy);
        newpromise.then(function (result) {
          $scope.artists = result.data;

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