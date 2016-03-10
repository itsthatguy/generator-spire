gulp.task('lint-js', function() {
  var eslint = require('gulp-eslint');
  var gUtil = require('gulp-util');

  return gulp.src(config.lintJs.src)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .on('error', gUtil.log);
});
