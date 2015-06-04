/* global config, $ */
'use strict';

// Watching the things:
// gulp.watch is limited and doesn't observe files that
// are added after the task is run, so we use gulp-watch
gulp.task('watch', ['default'], function() {
  function watch(src, task) {
    return $.watch(src, function() {
      gulp.start(task);
    });
  }

  watch(config.watch.assets.src,       config.watch.assets.task);
  watch(config.watch.assetsData.src,   config.watch.assetsData.task);
  watch(config.watch.assetsVendor.src, config.watch.assetsVendor.task);
  watch(config.watch.jade.src,         config.watch.jade.task);
  watch(config.watch.js.src,           config.watch.js.task);
  watch(config.watch.lint.src,         config.watch.lint.task);
  watch(config.watch.sass.src,         config.watch.sass.task);
});
