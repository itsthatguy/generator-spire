'use strict';

import MainController from './main.controller';     // jshint ignore:line
import Videos         from './thing/thing';       // jshint ignore:line

export default angular.module('<%= projectName %>.Main', [
  '<%= projectName %>.Thing',
  'angular.filter'
])
.controller('MainController', MainController);
