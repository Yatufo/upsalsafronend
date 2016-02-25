/* App Module */
var UploadImageController = function($scope, upload, CONFIG) {


  $scope.init = function() {
    $scope.item.images = $scope.item.images || [];

    $scope.status = {
      current: "initial"
    };

    if (_.isEmpty($scope.item.images)) {
      $scope.options = _.extend($scope.options ? $scope.options : {}, {editimage : true});
    }
  };

  $scope.$watch("item", function(newValue) {
    if (newValue) {
      $scope.init();
    }
  });


  $scope.showUpload = function() {
    return _.includes(["failed", "initial"], $scope.status.current);
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
      options: "=?"
    },
    controller: ['$scope', 'Upload', 'CONFIG', UploadImageController],
    templateUrl: 'views/components/upload-image.html'
  };
});
