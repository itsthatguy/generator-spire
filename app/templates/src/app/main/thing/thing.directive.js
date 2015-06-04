'use strict';

export default function() {
  return {
    scope: {},
    templateUrl: 'app/main/thing/thing.index.html',
    replace: true,
    controller: 'ThingController',
    controllerAs: 'ctrl'
  };
}
