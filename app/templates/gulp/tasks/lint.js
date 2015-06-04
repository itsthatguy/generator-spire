/* global config, $ */
'use strict';

gulp.task('lint', function() {
  return gulp.src(config.lint.src)
  .pipe($.plumber())
  .pipe($.jshint())
  .pipe($.jshint.reporter(config.lint.reporter, { verbose: true }))
  .on('error', $.util.log);
});
