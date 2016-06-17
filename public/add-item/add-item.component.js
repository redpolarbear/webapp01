'use strict';

angular.module('addItem').
component('addItem', {
    templateUrl: 'add-item/add-item.template.html',
    controller: ['$scope', 'scrapeAPI', 'saveItemAPI', function AddItemController($scope, scrapeAPI, saveItemAPI) {
        $scope.showScrapeDetails = false;
        this.getScrapePost = function getScrapePost() {
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

        this.saveScrapeItem = function saveScrapeItem() {
            saveItemAPI.saveScrapeDetails($scope.item)
                .then(function(result) {
                    console.log(result);
                });
        };
    }]
});
