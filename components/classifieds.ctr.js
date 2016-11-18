(() => {
  'use strict';

  angular
    .module('ngClassifieds')
    .controller('classifiedsCtrl', ($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) => {

      classifiedsFactory.getClassifieds().then((classifieds) => {
        $scope.classifieds = classifieds.data;
        $scope.categories = getCategories($scope.classifieds);
      });

      const getCategories = (classifieds) => {
        let categories = [];

        angular.forEach(classifieds, (item) => {
          angular.forEach(item.categories, (category) => {
            categories.push(category);
          });
        });

        return _.uniq(categories);
      }

      $scope.openSidebar = () => $mdSidenav('left').open();
      $scope.closeSidebar = () => $mdSidenav('left').close();

      const showToast = (message) => {
        $mdToast.show(
          $mdToast.simple()
          .content(message)
          .position('top, right')
          .hideDelay(3000)
        );
      }

      const contact = {
        name: 'John Doe',
        phone: '(555) 555-5555',
        email: 'johndoe@gmail.com',
      }

      $scope.saveClassified = (classified) => {
        if (classified) {
          classified.contact = contact;
          $scope.classifieds.push(classified);
          $scope.classified = {};
          $scope.closeSidebar();
          showToast('Classified saved');
        }
      }

      $scope.editClassified = (classified) => {
        $scope.editing = true;
        $scope.openSidebar();
        $scope.classified = classified;
      }

      $scope.saveEdit = () => {
        $scope.closeSidebar();
        $scope.editing = false;
        $scope.classified = {};
        showToast('Classified edited');
      }

      $scope.deleteClassified = (event, classified) => {
        const confirm = $mdDialog.confirm()
          .title(`Are you sure you want to delete ${classified.title} ?`)
          .ok('yes')
          .cancel('No')
          .targetEvent(event);

        $mdDialog.show(confirm).then(() => {
          const index = $scope.classifieds.indexOf(classified);
          $scope.classifieds.splice(index, 1);
        })
      }
  });
})();







//
