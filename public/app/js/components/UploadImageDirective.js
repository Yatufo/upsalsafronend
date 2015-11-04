/* App Module */
var UploadImageController = function($scope, upload) {

  $scope.$watch('image', function() {
    if ($scope.image) {
      $scope.upload($scope.image);
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
      console.log(location);
      // TODO: use the updated location;
    }, function(resp) {
      $scope.image = undefined;
    }, function(evt) {
      $scope.image.progress = parseInt(100.0 * evt.loaded / evt.total);
      console.log("progress", $scope.image.progress);
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
