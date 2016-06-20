'use strict';

angular
    .module('itemApp')
    .factory('uploadImgAPI', uploadImgAPI);

saveItemAPI.$inject = ['$http'];

function uploadImgAPI($http) {
  return {
      uploadImg: uploadImg
  }
  function uploadImgPost(img) {
        return $http.post('/api/weidian/uploadimg', img);
    }
};
