/* global $, path, config */
'use strict';

var fs = require('fs');

gulp.task('deploy:gh', ['default'], function() {
  var bowerComponentsDir = path.join(config.PROJECT_ROOT, 'bower_components');
  fs.exists(bowerComponentsDir, function(exists) {
    if (!exists) { fs.mkdirSync(bowerComponentsDir); }
  });

  return gulp.src(path.join(config.DIST, '/**/*'))
  .pipe($.ghPages());
});

