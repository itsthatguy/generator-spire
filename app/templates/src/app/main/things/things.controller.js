'use strict';

function ThingsCtrl($scope, DataService) {
  DataService.get('things').then(function(data) {
    $scope.things = data;
  });
}

export default ['$scope', 'DataService', ThingsCtrl];
