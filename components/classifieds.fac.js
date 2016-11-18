'use strict';

angular
  .module('ngClassifieds')
  .factory('classifiedsFactory', ($http) => {
    const getClassifieds = () => {
      return $http.get('../data/classifieds.json');
    };

    return { getClassifieds };
});
