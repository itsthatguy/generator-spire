/* global config, $ */
gulp.task('lint', () => {
  return gulp.src(config.lint.src)
  .pipe($.plumber())
  .pipe($.eslint())
  .pipe($.eslint.format())
  .on('error', $.util.log);
});
