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

    $scope.imgs = savedScrapeItem.imageLocalURLs;

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
    var cny_price = parseInt(savedScrapeItem.price)*1.12*5.2*1.20;
    $scope.est_price = savedScrapeItem.price + ' * 1.12 * 5.2 * 1.20 = ' + cny_price;
    $scope.price = cny_price;
    // $scope.cate =

    //  = $scope.free_delivery
    //  = $scope.remote_free_delivery

    $scope.uploadImgtoWeidian = function uploadImgtoWeidian(imgs) {
        imgs.forEach(function(element, index) {
                var imgFile = {
                    img: element
                };
                uploadProductAPI.uploadImage(imgFile)
                    .then(function(imgURL) {
                        var dataObj = JSON.parse(imgURL.data);
                        // console.log(dataObj.result);
                        // console.log(imgURL);
                        productDetail.bigImgs.push(dataObj.result);
                        // console.log(productDetail.bigImgs);
                        $scope.weidianImageURLs = productDetail.bigImgs;
                    });
            });
    };

    $scope.uploadProducttoWeidian = function uploadProducttoWeidian() {
      productDetail.itemName = $scope.itemName;
      productDetail.price = $scope.price;
      productDetail.stock = $scope.stock;

      for (i = 0; i < productDetail.bigImgs.length; i++) {
        productDetail.titles.push('Product Image ' + (i+1));
        console.log(productDetail.titles);
      };

      productDetail.cate_id = '83115821';

      productDetail.free_delivery = $scope.free_delivery;
      productDetail.remote_free_delivery = $scope.remote_free_delivery;

      uploadProductAPI.uploadProduct(productDetail)
       .then(function(result) {
         console.log(result);
       });


    };
};
