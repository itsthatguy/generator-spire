'use strict';

import NavbarController from './navbar.controller';
import NavbarDirective from './navbar.directive';

export default angular.module('<%= projectName %>.Navbar', [])
.directive('navbar', NavbarDirective)
.controller('NavbarController', NavbarController);
