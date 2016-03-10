// Moves static files to dist folder
gulp.task('assets', function() {
  var browserSync = require('browser-sync');

  return gulp.src(config.assets.src)
  .pipe(plumber())
  .pipe(gulp.dest(config.assets.dest))
  .pipe(browserSync.reload({stream: true}));
});
