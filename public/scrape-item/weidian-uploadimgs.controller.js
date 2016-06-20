angular.module('scrapeItem')
  .controller('weidianUploadImgsCtrl', weidianUploadImgsCtrl);

weidianUploadImgsCtrl.$inject = ['$scope', 'uploadImgAPI', '$uibModalInstance', 'uploadImgLocalUrls'];

var weidianUploadImgsCtrl = function ($scope, uploadImgAPI, $uibModalInstance, uploadImgLocalUrls) {

    $scope.imageLocalURLs = uploadImgLocalUrls;

    $scope.uploadImgtoWeidian = function uploadImgtoWeidian(img) {
      var imgLocation = img;

    uploadImgAPI.uploadImgPost(imgLocation)
      .then(function(retunUrl) {

      })

      console.log(img);

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
});
