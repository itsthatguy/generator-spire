'use strict';

function NavbarCtrl($scope, $state) {
  $scope.date = new Date();
  $scope.$state = $state;
}

export default ['$scope', '$state', NavbarCtrl];
