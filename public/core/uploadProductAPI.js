'use strict';

angular
    .module('itemApp')
    .factory('uploadProductAPI', uploadProductAPI);

uploadProductAPI.$inject = ['$http'];

function uploadProductAPI($http) {
  return {
      uploadProduct: uploadProduct,
      uploadImage: uploadImage
  };

  function uploadProduct(productDetail) {
    return $http.post('/api/uploadproduct', productDetail);
  };

  function uploadImage(imageDetail) {
    return $http.post('/api/uploadimage', imageDetail);
  };
};
