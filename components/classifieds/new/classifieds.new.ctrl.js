'use strict';

angular
  .module('ngClassifieds')
  .controller('newClassifiedsCtrl', function($scope, $state, $mdSidenav, $timeout) {
    const vm = this;
    vm.closeSidebar = closeSidebar;
    vm.saveClassified = saveClassified;

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

    function saveClassified(classified) {
      if (classified) {
        classified.contact = {
          name: 'John Doe',
          phone: '(555) 555-5555',
          email: 'johndoe@gmail.com',
        }

        $scope.$emit('newClassified', classified);
        vm.sidenavOpen = false;
      }
    }

    function closeSidebar() {
      vm.sidenavOpen = false;
    }
});
