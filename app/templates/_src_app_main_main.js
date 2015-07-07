'use strict';

import MainController from './main.controller';     // jshint ignore:line
import Things         from './things/things';       // jshint ignore:line

export default angular.module('<%= projectName %>.Main', [
  '<%= projectName %>.Things',
  'angular.filter'
])
.controller('MainController', MainController);
