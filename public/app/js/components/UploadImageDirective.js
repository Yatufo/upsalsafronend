/* App Module */
var UploadImageController = function($scope, upload) {
  $scope.location = $scope.location || {};
  $scope.init = function () {
    $scope.status = {};

    if (! _.isEmpty($scope.location.images)) {
      $scope.location.imageUrl = "http://192.168.2.11:3001/w320-h150/images/" + $scope.location.images[0].url
    } else {
      $scope.location.imageUrl = "http://d2ivgofa0qqp48.cloudfront.net/w290-h168/images/locations/montreal.jpg"
    }

  };

  $scope.init();


  $scope.$watch('image', function(newValue, oldValue) {
    console.log(newValue, oldValue);

    if (newValue) {
      $scope.status.current = "uploading"
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
