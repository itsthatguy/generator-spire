/* global config, $ */
'use strict';

// run a server for development with browsersync
gulp.task('serve', ['watch'], () => {
  $.browserSync.init(config.serve.browserSyncOptions);
});
