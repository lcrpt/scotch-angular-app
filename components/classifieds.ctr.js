(() => {
  'use strict';

  angular
    .module('ngClassifieds')
    .controller('classifiedsCtrl', ($scope, $http) => {

      $http.get('../data/classifieds.json')
      .then((classifieds) => {
        $scope.classifieds = classifieds.data;
      })
      .catch((err) => {
        console.error(err);
      });
    });
})();
