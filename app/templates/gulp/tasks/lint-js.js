/* global config, $ */
gulp.task('lint-js', function() {
  return gulp.src(config.lintJs.src)
  .pipe($.plumber())
  .pipe($.eslint())
  .pipe($.eslint.format())
  .on('error', $.util.log);
});
