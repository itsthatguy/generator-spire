import del from 'del';

// Swab the deck!
gulp.task('clean', function() {
  return del.sync(`${config.PROJECT_ROOT}/dist/**/*`);
});
