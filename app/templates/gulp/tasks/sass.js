/* global config, $ */
'use strict';

gulp.task('sass', function() {
  var injectSassSrc = gulp.src(config.sass.inject.src, {read: false});

  return gulp.src(config.sass.src)
  .pipe($.plumber())
  .pipe($.inject(injectSassSrc, config.sass.inject.options))
  .pipe($.sass(config.sass.options))
  .on('error', $.util.log)
  .pipe(gulp.dest(config.sass.dest))
  .pipe($.filter(config.sass.filter))
  .pipe($.browserSync.reload({stream:true}));
});
