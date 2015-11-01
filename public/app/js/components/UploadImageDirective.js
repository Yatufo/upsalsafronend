/* App Module */
var UploadImageController = function($scope, upload) {

  console.log("directive");
    $scope.$watch('image', function() {
      if ($scope.image) {
        $scope.upload($scope.image);
      }
    });


    // upload on file select or drop
    $scope.upload = function(file) {
      upload.upload({
        url: 'api/images',
        data: {
          image: file
        }
      }).then(function(resp) {
        console.log('Success ' + resp.config.data.image.name + 'uploaded. Response: ' + resp.data);
      }, function(resp) {
        $scope.image = undefined;
        console.log('Error status: ' + resp.status);
      }, function(evt) {
        $scope.image.progress = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + $scope.image.progress + '% ' + evt.config.data.image.name);
      });
    };

};


angular.module('eventify').directive('uploadimage', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {},
    controller: ['$scope', 'Upload', UploadImageController],
    templateUrl: 'views/components/upload-image.html'
  };
});
