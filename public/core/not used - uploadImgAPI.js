'use strict';

angular
    .module('itemApp')
    .factory('uploadImageAPI', uploadImageAPI);

uploadImageAPI.$inject = ['$http'];

function uploadImage($http) {
  return {
      uploadImage: uploadImage
  }
  function uploadProduct(productDetail) {
        return $http.post('/api/uploadproduct', productDetail);
    }
};
