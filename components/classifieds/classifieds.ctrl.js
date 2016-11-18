'use strict';

angular
  .module('ngClassifieds')
  .controller('classifiedsCtrl', function($scope, $http, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
    const vm = this;
    vm.openSidebar = openSidebar;
    vm.editClassified = editClassified;
    vm.deleteClassified = deleteClassified;

    classifiedsFactory.getClassifieds().then((classifieds) => {
      vm.classifieds = classifieds.data;
      vm.categories = getCategories(vm.classifieds);
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

    const showToast = (message) => {
      $mdToast.show(
        $mdToast.simple()
        .content(message)
        .position('top, right')
        .hideDelay(3000)
      );
    }

    function openSidebar() {
      $state.go('classifieds.new');
    }

    $scope.$on('newClassified', (event, classified) => {
      classified.id = vm.classifieds.lenth + 1;
      vm.classifieds.push(classified);
      showToast('New classified saved');
    });

    $scope.$on('editSaved', (event, message) => {
      showToast(message);
    })

    function editClassified(classified) {
      $state.go('classifieds.edit', { id: classified.id, classified: classified });
    }

    function deleteClassified(event, classified) {
      const confirm = $mdDialog.confirm()
        .title(`Are you sure you want to delete ${classified.title} ?`)
        .ok('yes')
        .cancel('No')
        .targetEvent(event);

      $mdDialog.show(confirm).then(() => {
        const index = vm.classifieds.indexOf(classified);
        vm.classifieds.splice(index, 1);
      })
    }
});
