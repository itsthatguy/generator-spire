'use strict';

import Navbar from './components/navbar/navbar'; // jshint ignore:line
import Data   from './components/data/data';     // jshint ignore:line
import Main   from './main/main';                // jshint ignore:line

angular.module('<%= projectName %>',
  ['ngAnimate',
   'ngCookies',
   'ngTouch',
   'ngSanitize',
   'ngResource',
   'ui.router',
   'mm.foundation',
   '<%= projectName %>.Navbar',
   '<%= projectName %>.Data',
   '<%= projectName %>.Main']
)

// DO NOT EDIT OR REMOVE THESE NEXT 2 LINES
// injectconfig
// endinject

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'app/main/main.html',
    controller: 'MainController'
  });

  $urlRouterProvider.otherwise('/');
});
