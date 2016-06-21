angular.module('scrapeItem')
  .controller('weidianUploadImgsCtrl', weidianUploadImgsCtrl);

weidianUploadImgsCtrl.$inject = ['$scope', 'uploadImgAPI', '$uibModalInstance', 'uploadImgLocalUrls'];

function weidianUploadImgsCtrl($scope, uploadImgAPI, $uibModalInstance, uploadImgLocalUrls) {

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
