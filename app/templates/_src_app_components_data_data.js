'use strict';

import DataService from './data.service';

export default angular.module('<%= projectName %>.Data', [])
.service('DataService', DataService);
