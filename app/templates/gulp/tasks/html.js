// Move html, and inject <script> tags for
// all of the bower dependencies
gulp.task('html', function() {
  var isEmpty      = require('lodash').isEmpty;
  var gulpif       = require('gulp-if');
  var inject       = require('gulp-inject');
  var browserSync  = require('browser-sync');

  var bowerSrc = gulp.src(config.html.inject.vendor.src, {read: false});
  var headSrc  = gulp.src(config.html.inject.head.src, {read: false});

  gulp.src(config.html.src)
  .pipe(plumber())
  .pipe(gulpif((!isEmpty(config.env.googleAnalyticsCode)),
    inject(config.html.inject.googleAnalytics.src, config.html.inject.googleAnalytics.options)
  ))
  .pipe(inject(bowerSrc, config.html.inject.vendor.options))
  .pipe(inject(headSrc,  config.html.inject.head.options))
  .pipe(gulp.dest(config.html.dest))
  .pipe(browserSync.reload({stream:true}));
});
