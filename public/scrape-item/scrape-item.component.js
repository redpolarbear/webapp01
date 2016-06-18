'use strict';

angular.module('scrapeItem').
component('scrapeItem', {
    templateUrl: 'scrape-item/scrape-item.template.html',
    controller: ['$scope', 'scrapeAPI', 'saveItemAPI', '$uibModal', function AddItemController($scope, scrapeAPI, saveItemAPI, $uibModal) {
        $scope.showScrapeDetails = false;
        $scope.getScrapePost = function getScrapePost() {
            // $scope.loading = true;
            //get the url link from the addItem.link (ng-model)
            var link = {
                url: $scope.addItem.link
            }
            if (link.url == "") {
                console.log('please input the link!!!');
            } else {
                console.log(link.url);
                //route to the /api/additem/scrape, expressjs will take the scraping
                scrapeAPI.getScrapeDetails(link)
                    .then(function(result) {
                        console.log(result);
                        $scope.setImage = function setImage(imageUrl) {
                            $scope.mainImageUrl = imageUrl;
                        };
                        //show the detail frame
                        $scope.showScrapeDetails = true;
                        $scope.item = result.data;
                        $scope.setImage($scope.item.imageURLs[0]);
                    });
            };
        };

        $scope.saveScrapeItem = function saveScrapeItem() {
            saveItemAPI.saveScrapeDetails($scope.item)
                .then(function(result) {
                    console.log(result);
                });
        };

        $scope.openUploadImgs = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'weidian-uploadimgs-modalcontent.html',
                controller: 'ModalInstanceCtrl',
                size: lg,
                resolve: {
                    upload_imgs: function() {
                        return $scope.item.imageURLs;
                    }
                }
            });
        };
        
    }]
});
