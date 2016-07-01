'use strict';

angular
    .module('itemApp')
    .factory('uploadProductAPI', uploadProductAPI);

uploadProductAPI.$inject = ['$http'];

function uploadProductAPI($http) {
  return {
      uploadProduct: uploadProduct,
      uploadImage: uploadImage,
      saveProduct: saveProduct
  };

  function uploadProduct(productDetail) {
    return $http.post('/api/uploadproduct', productDetail);
  };

  function uploadImage(imgFile) {
    return $http.post('/api/uploadimage', imgFile);
  };

  function saveProduct(weidianProductInfo) {
      return $http.post('api/saveproduct', weidianProductInfo);
  };
};
