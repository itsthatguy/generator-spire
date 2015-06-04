/* global config, path */
'use strict';

module.exports = {
  vendor: [
    path.join(config.PROJECT_ROOT, 'bower_components/formerjs/index.js'),
    path.join(config.PROJECT_ROOT, 'bower_components/owl.carousel/dist/owl.carousel.js'),
    path.join(config.PROJECT_ROOT, 'bower_components/owl.carousel/dist/assets/owl.carousel.css')
  ]
};
