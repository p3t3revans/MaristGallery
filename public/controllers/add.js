angular.module('MyApp')
  .controller('AddCtrl', ['$scope', '$alert', 'Show', function ($scope, $alert, Show) {
   // $scope.fileChanged = function (element) {
      //alert('show changed ' + element.files[0].name);
      //var fs = require('fs');
     // $scope.imageString = fs.readFileSync(element.files[0]).toString('base64');
   // }
    $scope.addShow = function () {
      Show.save({ showName: $scope.showName },
        function () {
          $scope.showName = '';
          $scope.addForm.$setPristine();
          $alert({
            content: 'TV show has been added.',
            placement: 'top-right',
            type: 'success',
            duration: 3
          });
        },
        function (response) {
          $scope.showName = '';
          $scope.addForm.$setPristine();
          $alert({
            content: response.data.message,
            placement: 'top-right',
            type: 'danger',
            duration: 3
          });
        });
    };
  }]);