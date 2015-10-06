'use strict';

export default function() {
  return {
    scope: {},
    templateUrl: 'app/main/things/things.index.html',
    replace: true,
    controller: 'ThingsController',
    controllerAs: 'ctrl'
  };
}
