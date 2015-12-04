angular.module('MyApp')
  .controller('SubjectCtrl', ['$scope', '$rootScope', 'Subject', function ($scope, $rootScope, Subject) {
   
    $scope.yearData = {
      availableOptions: [
        { year: 2015 },
        { year: 2016 },
        { year: 2017 },
        { year: 2018 },
        { year: 2019 },
        { year: 2020 },
        { year: 2021 }
      ],
      selectedOption: { year: '2015' } //This sets the default value of the select in the ui
    };
    
    $scope.yearLevelData = {
      availableOptions: [
        { yearLevel: 7 },
        { yearLevel: 8 },
        { yearLevel: 9 },
        { yearLevel: 10 },
        { yearLevel: 11 },
        { yearLevel: 12 }
      ],
      selectedOption: { yearLevel: 7 } //This sets the default value of the select in the ui
    };

    $scope.semesterData = {
      availableOptions: [
        { semester: 1 },
        { semester: 2 }
      ],
      selectedOption: { semester: 1 } //This sets the default value of the select in the ui
    };
    
    $scope.submitSubject = function () {
      //   var picture = new Picture();
      console.log('at the client and about to add the picture \\\(^o^\)/');
      //nameS = this.pictureName;
      
      Subject.addSubject({
        title: $scope.subject.title,
        description: $scope.subject.description,
        yearLevel: $scope.yearLevelData.selectedOption.yearLevel,
        year: $scope.yearData.selectedOption.year,
        semester: $scope.semesterData.selectedOption.semester,
        teacher: $scope.subject.teacher
      });//call the service and pass the base64 string
    };//closure for submitPictue
    
    //closure for controller  
  }]);
  