/* global config, $ */
gulp.task('lint-sass', function () {
  return gulp.src(config.lintSass.src)
  .pipe($.sassLint(config.lintSass.options))
  .pipe($.sassLint.format())
  .pipe($.sassLint.failOnError());
});
