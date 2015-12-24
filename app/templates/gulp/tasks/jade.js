/* global config, $ */

// Compile jade, and inject <script> tags for
// all of the bower dependencies
gulp.task('jade', function() {
  var bowerSrc = gulp.src(config.jade.inject.vendor.src, {read: false});
  var headSrc  = gulp.src(config.jade.inject.head.src, {read: false});

  gulp.src(config.jade.inject.src)
  .pipe($.plumber())
  .pipe($.inject(bowerSrc, config.jade.inject.vendor.options))
  .pipe($.inject(headSrc,  config.jade.inject.head.options))
  .pipe($.jade(config.jade.inject.options))
  .pipe(gulp.dest(config.jade.dest))
  .pipe($.browserSync.reload({stream:true}));

  gulp.src(config.jade.src)
  .pipe($.plumber())
  .pipe($.jade(config.jade.options))
  .pipe(gulp.dest(config.jade.dest))
  .pipe($.browserSync.reload({stream:true}));
});
