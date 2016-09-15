import eslint from 'gulp-eslint';

export const LINT_JS = {
  src: [
    path.join(config.PROJECT_ROOT, '__tests__/**/*.{jsx,js}'),
    path.join(config.PROJECT_ROOT, 'src/**/*.{jsx,js}'),
    path.join(config.PROJECT_ROOT, 'gulp/**/*.js'),
    path.join(config.PROJECT_ROOT, 'gulpfile.js'),
    path.join(config.PROJECT_ROOT, 'webpack.config.js'),
  ],
};

gulp.task('lint:js', function() {
  return gulp.src(LINT_JS.src)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format())
  .on('error', gutil.log);
});
