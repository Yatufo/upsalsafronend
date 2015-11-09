/* App Module */
var UploadImageController = function($scope, upload, CONFIG) {

  $scope.init = function() {
    $scope.status = {
      current: "initial"
    };

    if (!_.isEmpty($scope.location.images)) {
      $scope.location.imageUrl = CONFIG.IMAGES_URL_ROOT + $scope.location.images[0].url
    } else {
      $scope.location.imageUrl = CONFIG.IMAGES_URL_ROOT + CONFIG.LOCATIONS_DEFAULT_IMAGE;
      $scope.isDefaultImage = true;
    }
  };

  $scope.$watch("location", function(newValue) {
    if (newValue) {
      $scope.init();
    }
  });


  $scope.showUpload = function() {
    return _.contains(["failed", "initial"], $scope.status.current);
  };

  // upload on file select or drop
  $scope.upload = function(file) {
    file = file || $scope.image;
    $scope.status.current = "uploading"

    upload.upload({
      url: "api/locations/" + $scope.location.id + "/images",
      data: {
        image: file
      }
    }).then(function(location) {
      $scope.status.current = "success"
    }, function(resp) {
      $scope.status.current = "failed"
    }, function(evt) {
      $scope.status.progress = parseInt(100.0 * evt.loaded / evt.total);
    });
  };

};


angular.module('eventify').directive('uploadimage', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      location: "="
    },
    controller: ['$scope', 'Upload', 'CONFIG', UploadImageController],
    templateUrl: 'views/components/upload-image.html'
  };
});
