/* App Module */
var UploadImageController = function($scope, upload) {
  $scope.location = $scope.location || {};
  $scope.init = function () {
    if (! _.isEmpty($scope.location.images)) {
      $scope.location.imageUrl = "http://localhost:3001/w320-h150/images/" + $scope.location.images[0].url
    } else {
      $scope.location.imageUrl = "http://d2ivgofa0qqp48.cloudfront.net/w290-h168/images/locations/montreal.jpg"
    }
  };

  $scope.init();


  $scope.$watch('image', function() {
    if ($scope.image) {
      $scope.image.uploading = true;
      $scope.image.failed = $scope.image.success = false;
      //$scope.upload($scope.image);
    }
  });


  // upload on file select or drop
  $scope.upload = function(file) {
    upload.upload({
      url: "api/locations/" + $scope.location.id + "/images",
      data: {
        image: file
      }
    }).then(function(location) {
      $scope.image.success = true;
      $scope.image.failed = $scope.image.uploading = false;
    }, function(resp) {
      $scope.image.failed = true;
      $scope.image.success = $scope.image.uploading = false;
    }, function(evt) {
      $scope.image.progress = parseInt(100.0 * evt.loaded / evt.total);
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
    controller: ['$scope', 'Upload', UploadImageController],
    templateUrl: 'views/components/upload-image.html'
  };
});
