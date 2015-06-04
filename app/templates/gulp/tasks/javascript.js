/* global config, $ */
'use strict';

// We use this for packaging our JS right now
gulp.task('js', function() {
  // This file source is irrelevant, it's a hack to create a single item
  var dummyInjectSrc = gulp.src('/dev/null', {read: false});

  return gulp.src(config.js.src)
  .pipe($.plumber())
  .pipe($.webpack(config.js.webpackOptions))
  .pipe($.inject(dummyInjectSrc, config.js.inject.options))
  .pipe(gulp.dest(config.js.dest))
  .pipe($.browserSync.reload({stream:true}));
});
