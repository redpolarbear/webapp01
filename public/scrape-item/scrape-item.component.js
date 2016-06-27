'use strict';

angular.module('scrapeItem').
component('scrapeItem', {
    templateUrl: 'scrape-item/scrape-item.template.html',
    controller: ['$scope', 'scrapeAPI', 'saveItemAPI', '$uibModal', function AddItemController($scope, scrapeAPI, saveItemAPI, $uibModal) {
        $scope.showScrapeDetails = false;
        var savedScrapeItem = {};

        $scope.getScrapePost = function getScrapePost() {
            // $scope.loading = true;
            //get the url link from the addItem.link (ng-model)
            if (!$scope.addItem_url) {
                $scope.isURLInputEmpty = true;
            } else {
                // console.log(link.url);
                //route to the /api/additem/scrape, expressjs will take the scraping
                var link = {
                    url: $scope.addItem_url
                };
                scrapeAPI.getScrapeDetails(link)
                    .then(function(result) {
                        $scope.setImage = function setImage(imageUrl) {
                            $scope.mainImageUrl = imageUrl;
                        };
                        //show the detail frame
                        $scope.isScraped = true;
                        $scope.showScrapeDetails = true;
                        $scope.gotAddItem_url = true;
                        $scope.item = result.data;
                        $scope.setImage($scope.item.imageURLs[0]);
                    });
            };
        };

        $scope.saveScrapeItem = function saveScrapeItem() {
            saveItemAPI.saveScrapeDetails($scope.item)
                .then(function(result) {
                    console.log(result);
                    savedScrapeItem = result.data;
                });
        };

        $scope.openWeidianUpload = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'scrape-item/weidian-upload-modal.html',
                controller: 'weidianUploadCtrl',
                resolve: {
                    savedScrapeItem: function() {
                        return savedScrapeItem;
                    }
                }
            });
        };

        $scope.closeAlert = function() {
            $scope.isURLInputEmpty = false;
            $scope.isScraped = false;
        };
    }]
});
