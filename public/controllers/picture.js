angular.module('MyApp')
  .controller('PictureCtrl', ['$scope', '$rootScope', 'Picture', 'Artist', 'Subject', function ($scope, $rootScope, Picture, Artist, Subject) {
    var today = new Date();
    //var dd = today.getDate();
    //var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    //var subjectForDropDown = [];
    var promise = Subject.getSubject(yyyy);
    promise.then(function (result) {
      $scope.dataSubject = result.data;
      
    });

    $scope.data = {
      availableOptions: [
        { name: 'Work on Paper' },
        { name: 'Sulpture' },
        { name: 'Work on Canvas' },
        { name: 'Photograph' },
        { name: 'Clay' }
      ],
      selectedOption: { name: 'Work on Paper' } //This sets the default value of the select in the ui
    };

    $scope.year = {
      availableOptions: [
        { year: 2015 },
        { year: 2016 },
        { year: 2017 },
        { year: 2018 },
        { year: 2019 },
        { year: 2020 },
        { year: 2021 }
      ],
      selectedOption: { year: yyyy } //This sets the default value of the select in the ui
    };

    $scope.filterByYear = function (year) {
      var len = $scope.dataSubject.length;
      for (var i = 0; i < len; i++) {
        $scope.dataSubject[i] = [];
      };
      $scope.dataSubject = [];
      yyyy = year.year;
      var newpromise = Subject.getSubject(yyyy);
      newpromise.then(function (result) {
        $scope.dataSubject = result.data;
       // result.data = [];
      });

    };

   $scope.filterBySubject = function (selection) {
      var enrolled = selection.year + (7 - selection.yearLevel);
      var promiseArtist = Artist.getArtist(enrolled);
      promiseArtist.then(function (result) {
        $scope.dataArtist = result.data;
      });
    };



    $scope.addPicture = function (element) {
      if (element.files && element.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          $('#img').attr("src", e.target.result);// what is this might not need to do the folloeing step
          // $('#base').text(e.target.result);
          $scope.picture.picture = e.target.result;//.toString('base64');
          //fileNameS = element.files[0].name;
        };
        FR.readAsDataURL(element.files[0]);
      };
    };//closure for addPicture
    
    $scope.submitPicture = function () {
      //   var picture = new Picture();
      //console.log('at the client and about to add the picture \\\(^o^\)/');
      //nameS = this.pictureName;
      
      var promiseAdd = Picture.addPicture({
        title: $scope.picture.title,
        year: $scope.year.selectedOption.year,
        artist: $scope.dataArtist.selectedOption._id,
        artistName: $scope.dataArtist.selectedOption.name,
        picture: $scope.picture.picture,
        medium: $scope.data.selectedOption.name,
        subject: $scope.dataSubject.selectedOption._id
      });//call the service and pass the base64 string
      promiseAdd.then(function (result){
       // alert("picture added");
      });
    };//closure for submitPictue
    
    //closure for controller  
  }]);
  
  