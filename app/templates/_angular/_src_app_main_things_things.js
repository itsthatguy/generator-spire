'use strict';

import ThingsService from './things.service';
import ThingsDirective from './things.directive';
import ThingsController from './things.controller';

export default angular.module('<%= projectName %>.Things', [])
.service('ThingsService', ThingsService)
.directive('things', ThingsDirective)
.controller('ThingsController', ThingsController);
