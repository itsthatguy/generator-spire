// Watching the things:
// gulp.watch is limited and doesn't observe files that
// are added after the task is run, so we use gulp-watch
gulp.task('watch', ['watch-pre-task'], function() {
  var watch = require('gulp-watch');

  function setupWatch(src, task) {
    return watch(src, function() {
      gulp.start(task);
    });
  }

  setupWatch(config.watch.assets.src,       config.watch.assets.task);
  setupWatch(config.watch.assetsVendor.src, config.watch.assetsVendor.task);
  setupWatch(config.watch.html.src,         config.watch.html.task);
  setupWatch(config.watch.lintJs.src,       config.watch.lintJs.task);
  setupWatch(config.watch.sass.src,         config.watch.sass.task);
  setupWatch(config.watch.lintSass.src,     config.watch.lintSass.task);
});
