'use strict';

angular
  .module('ngClassifieds')
  .controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout) {
    const vm = this;

    vm.closeSidebar = closeSidebar;

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

    function closeSidebar() {
      vm.sidenavOpen = false;
    }
});
