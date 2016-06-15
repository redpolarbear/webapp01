'use strict';

angular.module('addItem').
  compoment('addItem', {
    templateUrl: 'add-item.template.html',
    controller: [$scope, 'scrapeAPI', function AddItemController($scope, scrapeAPI) {

      this.getScrapePost = function getScrapePost() {

        $scope.loading = true;

        //get the url link from the addItem.link (ng-model)
        var link = {
          url: $scope.addItem.link
        }

        //route to the /api/additem/scrape, expressjs will take the scraping
        scrapeAPI.getScrapeDetails(link)
          .then(function(data) {
            console.log(data);


          })
      };
    }]
  });
