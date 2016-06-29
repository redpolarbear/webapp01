angular.module('scrapeItem')
    .controller('weidianUploadCtrl', weidianUploadCtrl);

weidianUploadCtrl.$inject = ['$scope', 'weidianTokenAPI', 'uploadProductAPI', '$uibModalInstance', 'savedScrapeItem', '$mdDialog'];

function weidianUploadCtrl($scope, weidianTokenAPI, uploadProductAPI, $uibModalInstance, savedScrapeItem, $mdDialog) {
    var productDetail = {
        itemName: "",
        price: "",
        stock: "",
        bigImgs: [],
        titles: [],
        cate_id: "",
        free_delivery: "",
        remote_free_delivery: "",
        access_token: ""
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
        "\nColors:\n- " + isDefined(savedScrapeItem.colors).join("\n- ") + "\n" +
        "\nSizes:\n- " + isDefined(savedScrapeItem.sizes).join("\n- ") + "\n" +
        "\nDimension: " + isDefined(savedScrapeItem.dimension) + "\n" +
        "\nWeight: " + isDefined(savedScrapeItem.weight) + "\n" +
        "\n" + isDefined(savedScrapeItem.description) + "\n" +
        "- " + savedScrapeItem.detail_descs.join("\n- ") +
        "\n\n" + customized_comment;

    productDetail.itemName = productDetail.itemName.replace(/"/g, "'"); // change the double quote to single
    $scope.itemName = productDetail.itemName;
    $scope.stock = "5"; //by default
    var cny_price = Math.round(parseInt(savedScrapeItem.price) * 1.12 * 5.2 * 1.20);
    $scope.est_price = savedScrapeItem.price + ' x 1.12 x 5.2 x 1.20 = ' + cny_price;
    $scope.price = cny_price;
    $scope.cate_id = "83115821"; // category for hs
    // $scope.cate =

    $scope.free_delivery = "1";
    $scope.remote_free_delivery = "1";

    $scope.uploadImgtoWeidian = function uploadImgtoWeidian(imgs) {
        var access_token = "";
        productDetail.bigImgs = [];
        weidianTokenAPI.weidianGetToken()
            .then(function(tokenObj) {
                // console.log(tokenObj);
                access_token = tokenObj.data.result.access_token; //callback return is the JSON
                imgs.forEach(function(element, index) {
                    var imgFile = {
                        img: element,
                        access_token: access_token
                    };
                    uploadProductAPI.uploadImage(imgFile)
                        .then(function(imgURL) {
                            var dataObj = JSON.parse(imgURL.data); //return obj.data = String, so need the JSON.parse();
                            productDetail.bigImgs.push(dataObj.result);
                            $scope.weidianImageURLs = productDetail.bigImgs;
                        });
                });
            });
    };

    $scope.uploadProducttoWeidian = function uploadProducttoWeidian() {
        productDetail.itemName = $scope.itemName;
        productDetail.price = $scope.price;
        productDetail.stock = $scope.stock;

        for (i = 0; i < productDetail.bigImgs.length; i++) {
            productDetail.titles.push('Product Image ' + (i + 1));
            // console.log(productDetail.titles);
        };

        productDetail.cate_id = $scope.cate_id;

        productDetail.free_delivery = $scope.free_delivery;
        productDetail.remote_free_delivery = $scope.remote_free_delivery;

        var access_token = "";
        weidianTokenAPI.weidianGetToken()
            .then(function(tokenObj) {
                access_token = tokenObj.data.result.access_token;
                productDetail.access_token = access_token;
                uploadProductAPI.uploadProduct(productDetail)
                    .then(function(result) {
                        console.log(result);
                        var idObj = JSON.parse(result.data); //return obj.data = String, so need the JSON.parse();
                        $scope.item_id = idObj.result.item_id;
                        $scope.gotItem_id = true;
                    });
            });
    };

    $scope.saveUploadedProduct = function saveUploadedProduct() {
        var weidianProductInfo = {
            item_id: $scope.item_id,
            scrapeItem_id: savedScrapeItem._id
        };

        uploadProductAPI.saveProduct(weidianProductInfo)
         .then(function(savedItem) {
            console.log(savedItem);
        });

    };
};
