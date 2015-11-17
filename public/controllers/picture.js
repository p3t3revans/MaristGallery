angular.module('MyApp')
  .controller('PictureCtrl', ['$scope', '$rootScope', 'Picture', function ($scope, $rootScope, Picture) {

    var pictureString = '';
    var fileNameS = '';
    var nameS = this.pictureName;//$rootScope.currentUser.email;


    $scope.addPicture = function (element) {
      if (element.files && element.files[0]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          $('#img').attr("src", e.target.result);
          $('#base').text(e.target.result);
          pictureString = 'data:text/html;base64,' + e.target.result.toString('base64');
          fileNameS = element.files[0].name;
        };
        FR.readAsDataURL(element.files[0]);
        /* var readURL = FR.readAsDataURL(element.files[0]);
         readURL.then(function () {
          Picture.addPicture({ picture: pictureString });
         });
         return readURL;*/
      };
    };//closure for addPicture
    
    $scope.submitPicture = function () {
      //   var picture = new Picture();
      console.log('at the client and about to add the picture \\\(^o^\)/');
      nameS = this.pictureName;
      //fileNameS = 'fileName';
  /*
      pictureString = 'data:text/html;base64,PGh0bWw+DQo8aGVhZD48dGl0bGU+NDAzIEZvcmJpZGRlbjwvdGl0bGU+PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgovLzwhW0NEQVRBWwp0cnl7aWYgKCF3aW5kb3cuQ2xvdWRGbGFyZSkge3ZhciBDbG91ZEZsYXJlPVt7dmVyYm9zZTowLHA6MCxieWM6MCxvd2xpZDoiY2YiLGJhZzI6MSxtaXJhZ2UyOjAsb3JhY2xlOjAscGF0aHM6e2Nsb3VkZmxhcmU6Ii9jZG4tY2dpL25leHAvZG9rM3Y9MTYxM2EzYTE4NS8ifSxhdG9rOiJmZTVmNDg3ZTE3YjFmNzRjZGRlYzM0MWQyMjEyOTAwZSIscGV0b2s6IjI2M2FiMjJlYzJlNjhmN2MzNDY5MzFiZmQwZTZkZjUzZTYyYmQ4MjYtMTQ0NzMwNTcyNS0xODAwIix6b25lOiJ0aGV0dmRiLmNvbSIscm9ja2V0OiIwIixhcHBzOnsiZ2Ffa2V5Ijp7InVhIjoiVUEtOTEzMTg2MS0xIiwiZ2FfYnMiOiIyIn19LHNoYTJ0ZXN0OjB9XTshZnVuY3Rpb24oYSxiKXthPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpLGI9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoInNjcmlwdCIpWzBdLGEuYXN5bmM9ITAsYS5zcmM9Ii8vYWpheC5jbG91ZGZsYXJlLmNvbS9jZG4tY2dpL25leHAvZG9rM3Y9MjQ3YTgwY2RmYS9jbG91ZGZsYXJlLm1pbi5qcyIsYi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShhLGIpfSgpfX1jYXRjaChlKXt9OwovL11dPgo8L3NjcmlwdD4KPHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgovKiA8IVtDREFUQVsgKi8KdmFyIF9nYXEgPSBfZ2FxIHx8IFtdOwpfZ2FxLnB1c2goWydfc2V0QWNjb3VudCcsICdVQS05MTMxODYxLTEnXSk7Cl9nYXEucHVzaChbJ190cmFja1BhZ2V2aWV3J10pOwoKKGZ1bmN0aW9uKCkgewp2YXIgZ2EgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsgZ2EudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBnYS5hc3luYyA9IHRydWU7CmdhLnNyYyA9ICgnaHR0cHM6JyA9PSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA/ICdodHRwczovL3NzbCcgOiAnaHR0cDovL3d3dycpICsgJy5nb29nbGUtYW5hbHl0aWNzLmNvbS9nYS5qcyc7CnZhciBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdOyBzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGdhLCBzKTsKfSkoKTsKCihmdW5jdGlvbihiKXsoZnVuY3Rpb24oYSl7Il9fQ0YiaW4gYiYmIkRKUyJpbiBiLl9fQ0Y/Yi5fX0NGLkRKUy5wdXNoKGEpOiJhZGRFdmVudExpc3RlbmVyImluIGI/Yi5hZGRFdmVudExpc3RlbmVyKCJsb2FkIixhLCExKTpiLmF0dGFjaEV2ZW50KCJvbmxvYWQiLGEpfSkoZnVuY3Rpb24oKXsiRkIiaW4gYiYmIkV2ZW50ImluIEZCJiYic3Vic2NyaWJlImluIEZCLkV2ZW50JiYoRkIuRXZlbnQuc3Vic2NyaWJlKCJlZGdlLmNyZWF0ZSIsZnVuY3Rpb24oYSl7X2dhcS5wdXNoKFsiX3RyYWNrU29jaWFsIiwiZmFjZWJvb2siLCJsaWtlIixhXSl9KSxGQi5FdmVudC5zdWJzY3JpYmUoImVkZ2UucmVtb3ZlIixmdW5jdGlvbihhKXtfZ2FxLnB1c2goWyJfdHJhY2tTb2NpYWwiLCJmYWNlYm9vayIsInVubGlrZSIsYV0pfSksRkIuRXZlbnQuc3Vic2NyaWJlKCJtZXNzYWdlLnNlbmQiLGZ1bmN0aW9uKGEpe19nYXEucHVzaChbIl90cmFja1NvY2lhbCIsImZhY2Vib29rIiwic2VuZCIsYV0pfSkpOyJ0d3R0ciJpbiBiJiYiZXZlbnRzImluIHR3dHRyJiYiYmluZCJpbiB0d3R0ci5ldmVudHMmJnR3dHRyLmV2ZW50cy5iaW5kKCJ0d2VldCIsZnVuY3Rpb24oYSl7aWYoYSl7dmFyIGI7aWYoYS50YXJnZXQmJmEudGFyZ2V0Lm5vZGVOYW1lPT0iSUZSQU1FIilhOntpZihhPWEudGFyZ2V0LnNyYyl7YT1hLnNwbGl0KCIjIilbMF0ubWF0Y2goL1tePz0mXSs9KFteJl0qKT8vZyk7Yj0wO2Zvcih2YXIgYztjPWFbYl07KytiKWlmKGMuaW5kZXhPZigidXJsIik9PT0wKXtiPXVuZXNjYXBlKGMuc3BsaXQoIj0iKVsxXSk7YnJlYWsgYX19Yj12b2lkIDB9X2dhcS5wdXNoKFsiX3RyYWNrU29jaWFsIiwidHdpdHRlciIsInR3ZWV0IixiXSl9fSl9KX0pKHdpbmRvdyk7Ci8qIF1dPiAqLwo8L3NjcmlwdD4KPC9oZWFkPg0KPGJvZHkgYmdjb2xvcj0id2hpdGUiPg0KPGNlbnRlcj48aDE+NDAzIEZvcmJpZGRlbjwvaDE+PC9jZW50ZXI+DQo8aHI+PGNlbnRlcj5uZ2lueDwvY2VudGVyPg0KPC9ib2R5Pg0KPC9odG1sPg0K';
   */
      
      //    picture.name = fileNameS;
      //   picture.fileName = fileNameS;
      //    picture.pictureString = pictureString;
      Picture.addPicture({
        name: fileNameS,
        fileName: nameS,
        picture: pictureString
      });//call the service and pass the base64 string
    };//closure for submitPictue
    
    //closure for controller  
  }]);
  
  