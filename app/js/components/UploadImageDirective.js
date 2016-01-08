/* App Module */
var UploadImageController = function($scope, upload, CONFIG) {


  $scope.init = function() {
    $scope.item.images = $scope.item.images || [];

    $scope.status = {
      current: "initial"
    };

    //TODO: Remove window dependency.
    var root = $(window).width() > CONFIG.HI_RES_WIDTH ? CONFIG.LO_RES_IMAGES : CONFIG.HI_RES_IMAGES;

    if (!_.isEmpty($scope.item.images)) {
      $scope.item.imageUrl = root + $scope.item.images[0].url
    } else {
      $scope.item.imageUrl = root + CONFIG.LOCATIONS_DEFAULT_IMAGE;
      $scope.options = _.extend($scope.options ? $scope.options : {}, {editimage : true});
    }
  };

  $scope.$watch("item", function(newValue) {
    if (newValue) {
      $scope.init();
    }
  });


  $scope.showUpload = function() {
    return _.contains(["failed", "initial"], $scope.status.current);
  };

  $scope.cancel = function () {
    $scope.image = undefined;
  }

  // upload on file select or drop
  $scope.upload = function(file) {
    file = file || $scope.image;
    $scope.status.current = "uploading"

    var endpoint = CONFIG.DEFAULT_IMAGE_ENDPOINT;
    if ($scope.type && $scope.item.id) {
       //Asumes the endpoint like this: for location type = /api/locations/:id/images
       endpoint = '/api/' + $scope.type + 's/' + $scope.item.id + '/images'
    }

    upload.upload({
      url: endpoint,
      data: {
        image: file
      }
    }).then(function(response) {
      if (response.status === 201) {
        var image = response.data;
        $scope.item.images.push(image);
        $scope.status.current = "success"
      } else {
        console.error($scope.item);
      }
    }, function(resp) {
      $scope.status.current = "failed"
    }, function(evt) {
      $scope.status.progress = parseInt(100.0 * evt.loaded / evt.total);
    });
  };

};


eventify.directive('uploadimage', function() {
  return {
    restrict: 'E',
    replace : true,
    scope: {
      item: "=",
      type: "=",
      options: "="
    },
    controller: ['$scope', 'Upload', 'CONFIG', UploadImageController],
    templateUrl: 'views/components/upload-image.html'
  };
});
