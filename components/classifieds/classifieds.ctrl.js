'use strict';

angular
  .module('ngClassifieds')
  .controller('classifiedsCtrl', function($scope, $http, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
    const vm = this;
    vm.openSidebar = openSidebar;
    vm.closeSidebar = closeSidebar;
    vm.saveClassified = saveClassified;
    vm.editClassified = editClassified;
    vm.saveEdit = saveEdit;
    vm.deleteClassified = deleteClassified;
    vm.classifieds;
    vm.categories;
    vm.editing
    vm.classified

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

    const contact = {
      name: 'John Doe',
      phone: '(555) 555-5555',
      email: 'johndoe@gmail.com',
    }

    function openSidebar() {
      $state.go('classifieds.new');
    }

    function closeSidebar() {
      return $mdSidenav('left').close();
    }

    function saveClassified(classified) {
      if (classified) {
        classified.contact = contact;
        vm.classifieds.push(classified);
        vm.classified = {};
        closeSidebar();
        showToast('Classified saved');
      }
    }

    function editClassified(classified) {
      vm.editing = true;
      openSidebar();
      vm.classified = classified;
    }

    function saveEdit () {
      closeSidebar();
      vm.editing = false;
      vm.classified = {};
      showToast('Classified edited');
    }

    function deleteClassified(event, classified) {
      const confirm = $mdDialog.confirm()
        .title(`Are you sure you want to delete ${classified.title} ?`)
        .ok('yes')
        .cancel('No')
        .targetEvent(event);

      $mdDialog.show(confirm).then(() => {
        const index = vm.indexOf(classified);
        vm.classifieds.splice(index, 1);
      })
    }
});
