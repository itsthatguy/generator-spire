/* global config */
gulp.task('assets:vendor', function() {
  return gulp.src(config.assetsVendor.src, {base: '.'})
  .pipe(gulp.dest(config.assetsVendor.dest));
});
