/* global $ */
'use strict';

// Swab the deck!
gulp.task('clean', () => {
  return $.del.sync(config.clean.src);
});
