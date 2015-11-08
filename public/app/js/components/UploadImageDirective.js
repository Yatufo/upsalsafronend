/* App Module */
var UploadImageController = function($scope, upload) {
  $scope.location = $scope.location || {};
  $scope.init = function () {
    $scope.status = {current : "initial"};

    if (! _.isEmpty($scope.location.images)) {
      $scope.location.imageUrl = "http://192.168.2.11:3001/w320-h200-cscale/images/" + $scope.location.images[0].url
    } else {
      $scope.location.imageUrl = "http://d2ivgofa0qqp48.cloudfront.net/w290-h168/images/locations/montreal.jpg"
      $scope.isDefaultImage = true;
    }

  };

  $scope.init();


  $scope.showUpload = function () {
    return _.contains( ["failed", "initial"], $scope.status.current );
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
    controller: ['$scope', 'Upload', UploadImageController],
    templateUrl: 'views/components/upload-image.html'
  };
});
