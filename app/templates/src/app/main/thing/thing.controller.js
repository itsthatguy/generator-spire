'use strict';
var _ = require('lodash');

function VideosCtrl($scope, DataService) {
  DataService.get('videos').then(function(data) {
    $scope.videos = _.chunk(data, 8);
  });
}

export default ['$scope', 'DataService', VideosCtrl];
