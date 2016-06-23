angular.module('scrapeItem')
  .controller('weidianUploadCtrl', weidianUploadCtrl);

weidianUploadCtrl.$inject = ['$scope', 'weidianTokenAPI', 'uploadProductAPI', '$uibModalInstance', 'savedScrapeItem'];

function weidianUploadCtrl($scope, weidianTokenAPI, uploadProductAPI, $uibModalInstance, savedScrapeItem) {
  var self = this;
  var productDetail = {
    itemName: "",
    price: "",
    stock: "",
    bigImgs: [],
    titles: [],
    cate_id: "",
    free_delivery: "",
    remote_free_delivery: ""
  };

  var public_params = {
    method: "vdian.item.add",
    access_token: "",
    version: "1.1",
    format: "json"
  }

  savedScrapeItem.title;
  savedScrapeItem.color;
  saveScrapeItem.dimension;
  saveScrapeItem.weight;
  savedScrapeItem.description;
  savedScrapeItem.detail_descs;


  $scope.itemName = self.savedScrapeItem.
  $scope.stock = "5";
  $scope.price = savedScrapeItem.price;
  $scope.cate =


   = $scope.free_delivery
   = $scope.remote_free_delivery
  // $scope.imageLocalURLs = savedScrapeItem.;

  $scope.uploadImgtoWeidian = function uploadImgtoWeidian(img) {
    var imgLocation = {
      imgFile: img
    };

    uploadImgAPI.uploadImgPost(imgLocation)
      .then(function(returnUrl) {
        console.log(returnUrl.result);
      })

      // console.log(img);
    };
  //
  //
  //
  // $scope.ok = function () {
  //   $uibModalInstance.close($scope.selected.item);
  // };
  //
  // $scope.cancel = function () {
  //   $uibModalInstance.dismiss('cancel');
  // };
};
