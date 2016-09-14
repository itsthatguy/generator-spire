import sassLint from 'gulp-sass-lint';

const LINT_SASS = {
  src: path.join(config.PROJECT_ROOT, 'src/**/*.scss'),
  options: require(path.join(config.PROJECT_ROOT, '.sasslint.js')),
};

gulp.task('lint:sass', function () {
  return gulp.src(LINT_SASS.src)
  .pipe(sassLint(LINT_SASS.options))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError());
});
