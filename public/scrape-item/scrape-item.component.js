'use strict';

angular.module('scrapeItem').
component('scrapeItem', {
    templateUrl: 'scrape-item/scrape-item.template.html',
    controller: ['$scope', 'scrapeAPI', 'saveItemAPI', '$uibModal', function AddItemController($scope, scrapeAPI, saveItemAPI, $uibModal) {
        $scope.showScrapeDetails = false;
        var imgs_local_names = [];
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
                    imgs_local_names = result.data.imageLocalURLs;
                    console.log(imgs_local_names);
                    console.log(result);
                });
        };

        $scope.open = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'scrape-item/weidian-uploadimgs-modal.html',
                controller: 'weidianUploadImgsCtrl',
                resolve: {
                    uploadImgLocalUrls: function() {
                        return imgs_local_names;
                    }
                }
            });
        };
    }]
});
