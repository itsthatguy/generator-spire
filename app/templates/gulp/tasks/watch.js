/* global config, $ */

// Watching the things:
// gulp.watch is limited and doesn't observe files that
// are added after the task is run, so we use gulp-watch
gulp.task('watch', ['watch-pre-task'], function() {
  function watch(src, task) {
    return $.watch(src, function() {
      gulp.start(task);
    });
  }

  watch(config.watch.assets.src,       config.watch.assets.task);
  watch(config.watch.assetsVendor.src, config.watch.assetsVendor.task);
  watch(config.watch.jade.src,         config.watch.jade.task);
  watch(config.watch.lintJs.src,       config.watch.lintJs.task);
  watch(config.watch.sass.src,         config.watch.sass.task);
  watch(config.watch.lintSass.src,     config.watch.lintSass.task);
});
