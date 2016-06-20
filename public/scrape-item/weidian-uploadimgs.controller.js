angular.module('scrapeItem')
  .controller('weidian-uploadimgs.controller', function ($scope, $uibModalInstance, uploadImgLocalUrls) {

    $scope.imageLocalURLs = uploadImgLocalUrls;
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
