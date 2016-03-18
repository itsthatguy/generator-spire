var ghPages = require('gulp-gh-pages');
var fs = require('fs');

gulp.task('deploy:gh', ['default'], () => {
  var bowerComponentsDir = path.join(config.PROJECT_ROOT, 'bower_components');
  fs.exists(bowerComponentsDir, (exists) => {
    if (!exists) { fs.mkdirSync(bowerComponentsDir); }
  });

  return gulp.src(path.join(config.DIST, '/**/*'))
  .pipe(ghPages());
});

