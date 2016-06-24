angular.module('scrapeItem')
    .controller('weidianUploadCtrl', weidianUploadCtrl);

weidianUploadCtrl.$inject = ['$scope', 'weidianTokenAPI', 'uploadProductAPI', '$uibModalInstance', 'savedScrapeItem'];

function weidianUploadCtrl($scope, weidianTokenAPI, uploadProductAPI, $uibModalInstance, savedScrapeItem) {
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

    var imgs = savedScrapeItem.imageLocalURLs;

    var isDefined = function(string) {
        if (string) {
            return string;
        } else {
            return "";
        };
    };

    productDetail.itemName = isDefined(savedScrapeItem.title) + "\n" +
        "\n" + isDefined(savedScrapeItem.partnumber) + "\n" +
        "\n" + isDefined(savedScrapeItem.color) + "\n" +
        "\n" + isDefined(savedScrapeItem.dimension) + "\n" +
        "\n" + isDefined(savedScrapeItem.weight) + "\n" +
        "\n" + isDefined(savedScrapeItem.description) + "\n" +
        "- " + savedScrapeItem.detail_descs.join("\n- ");

    $scope.itemName = productDetail.itemName;
    $scope.stock = "5"; //by default
    $scope.price = savedScrapeItem.price;
    // $scope.cate =

    //  = $scope.free_delivery
    //  = $scope.remote_free_delivery
    // $scope.imageLocalURLs = savedScrapeItem.;

    $scope.uploadImgtoWeidian = function uploadImgtoWeidian(img) {
        var imgLocation = {
            imgFile: img
        };

        uploadProductAPI.uploadImage(imgLocation)
            .then(function(imgURL) {
                console.log(imgURL.result);
            });

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
