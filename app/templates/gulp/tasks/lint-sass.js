gulp.task('lint-sass', function () {
  var sassLint = require('gulp-sass-lint');

  return gulp.src(config.lintSass.src)
  .pipe(sassLint(config.lintSass.options))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError());
});
