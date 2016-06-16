'use strict';

angular.module('addItem').
  component('addItem', {
    templateUrl: 'add-item/add-item.template.html',
    controller: ['$scope', 'scrapeAPI', function AddItemController($scope, scrapeAPI) {

      this.getScrapePost = function getScrapePost() {

        $scope.loading = true;

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

              $scope.item = result.data;
              // //render the data to the view
              // $scope.item.name = result.data.title;
              // $scope.item.description = result.data.description;
              // $scope.item.images = result.data.imageURLs;
              $scope.setImage($scope.item.imageURLs[0]);
            })
        };

      };
    }]
  });
