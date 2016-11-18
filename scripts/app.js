(() => {
  "use strict";

  angular
    .module('ngClassifieds', ['ngMaterial', 'ui.router'])
    .config(($mdThemingProvider, $stateProvider) => {
      $mdThemingProvider
        .theme('default')
        .primaryPalette('teal')
        .accentPalette('orange');

      $stateProvider
        .state('classifieds', {
          url: '/classifieds',
          templateUrl: '../components/classifieds/classifieds.tpl.html',
          controller: 'classifiedsCtrl as vm',
        })
    })
})();
