'use strict';

angular
  .module('ngClassifieds')
  .controller('newClassifiedsCtrl', function(classifiedsFactory, $mdSidenav, $mdToast, $mdDialog, $timeout) {
    const vm = this;

    $timeout(() => {
      $mdSidenav('left').open();
    })
});
