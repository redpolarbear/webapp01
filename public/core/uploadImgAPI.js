'use strict';

angular
    .module('itemApp')
    .factory('uploadImgAPI', uploadImgAPI);

saveItemAPI.$inject = ['$http'];

function uploadImgAPI($http) {
  return {
      uploadImgPost: uploadImgPost
  }
  function uploadImgPost(img) {
        return $http.post('/api/uploadimg', img);
    }
};
