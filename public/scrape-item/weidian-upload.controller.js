angular.module('scrapeItem')
  .controller('weidianUploadCtrl', weidianUploadCtrl);

weidianUploadCtrl.$inject = ['$scope', 'weidianTokenAPI', '$uibModalInstance', 'uploadImgLocalUrls'];

function weidianUploadCtrl($scope, uploadImgAPI, $uibModalInstance, uploadImgLocalUrls) {

    $scope.imageLocalURLs = uploadImgLocalUrls;

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
