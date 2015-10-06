/* global config, $ */
'use strict';

// Moves static files to dist folder
gulp.task('assets', () => {
  return gulp.src(config.assets.src)
  .pipe($.plumber())
  .pipe(gulp.dest(config.assets.dest))
  .pipe($.browserSync.reload({stream:true}));
});
