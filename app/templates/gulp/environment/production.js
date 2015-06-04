/* global config, path */
'use strict';

module.exports = {
  vendor: [
    path.join(config.PROJECT_ROOT, 'bower_components/owl.carousel/dist/owl.carousel.min.js'),
    path.join(config.PROJECT_ROOT, 'bower_components/owl.carousel/dist/assets/owl.carousel.min.css')
  ]
};
