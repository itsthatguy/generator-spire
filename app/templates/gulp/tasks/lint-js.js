gulp.task('lint-js', function() {
  var eslint = require('gulp-eslint');

  return gulp.src(config.lintJs.src)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .on('error', gutil.log);
});
