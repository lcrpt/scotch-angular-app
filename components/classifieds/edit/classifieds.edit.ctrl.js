'use strict';

angular
  .module('ngClassifieds')
  .controller('editClassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {
    const vm = this;
    vm.closeSidebar = closeSidebar;
    vm.saveEdit = saveEdit;
    vm.classified = $state.params.classified;

    $timeout(() => {
      $mdSidenav('left').open();
    })

    $scope.$watch('vm.sidenavOpen', (sidenav) => {
      if (sidenav === false) {
        $mdSidenav('left')
          .close()
          .then(() => {
            $state.go('classifieds');
          });
      }
    });

    function saveEdit() {
      $scope.sidenavOpen = false;
      $scope.$emit('editSaved', 'Edit Saved');
    }

    function closeSidebar() {
      vm.sidenavOpen = false;
    }
});
