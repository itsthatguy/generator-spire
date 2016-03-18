// Swab the deck!
gulp.task('clean', function() {
  var del = require('del');

  return del.sync('dist/**/*');
});
