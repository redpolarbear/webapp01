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
            return "N/A";
        };
    };

    var customized_comment = "备注：根据中国海关规定，境外发往中国的包裹，必须提交收货人身份证信息清关。\n为了能尽快发出包裹，请您在下单之后关注微信订阅号（亚瑟的Funky俱乐部），并联系上传收件人的身份证正反面，我们将保证您的个人信息安全。"

    productDetail.itemName = "【加拿大直邮含税】 " + isDefined(savedScrapeItem.title) + "\n" +
        "\nPartnumber: " + isDefined(savedScrapeItem.partnumber) + "\n" +
        "\nColors:\n-" + isDefined(savedScrapeItem.colors).join("\n- ") + "\n" +
        "\nDimension: " + isDefined(savedScrapeItem.dimension) + "\n" +
        "\nWeight: " + isDefined(savedScrapeItem.weight) + "\n" +
        "\n" + isDefined(savedScrapeItem.description) + "\n" +
        "- " + savedScrapeItem.detail_descs.join("\n- ") +
        "\n\n" + customized_comment;

    productDetail.itemName = productDetail.itemName.replace(/"/g,"'"); // change the double quote to single
    $scope.itemName = productDetail.itemName;
    $scope.stock = "5"; //by default
    var cny_price = Math.round(parseInt(savedScrapeItem.price)*1.12*5.2*1.20);
    $scope.est_price = savedScrapeItem.price + ' x 1.12 x 5.2 x 1.20 = ' + cny_price;
    $scope.price = cny_price;
    $scope.cate_id = "83115821"; // category for hs
    // $scope.cate =

    $scope.free_delivery = "1";
    $scope.remote_free_delivery = "0";

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

      productDetail.cate_id = $scope.cate_id;

      productDetail.free_delivery = $scope.free_delivery;
      productDetail.remote_free_delivery = $scope.remote_free_delivery;

      uploadProductAPI.uploadProduct(productDetail)
       .then(function(result) {
         console.log(result);
       });


    };
};
