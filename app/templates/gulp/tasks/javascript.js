/* global config, $ */
gulp.task('js', function() {
  var webpack = require('webpack-stream');
  $.del.sync('dist/main.js');

  return gulp.src(config.js.src)
  .pipe($.plumber())
  .pipe(webpack(config.js.webpackOptions))
  .pipe(gulp.dest(config.js.dest))
  .pipe($.browserSync.reload({stream:true}));
});
