// Moves static files to dist folder
import browserSync from 'browser-sync';

export const ASSETS = {
  src: [
    `!${config.PROJECT_ROOT}/src/app/index.html`,
    `${config.PROJECT_ROOT}/src/**/*.{png,jpg,mp4,eot,svg,ttf,woff,html,ico,svg}`,
    `${config.PROJECT_ROOT}/src/CNAME`
  ],
  dest: config.DIST
};

gulp.task('assets', function () {
  return gulp.src(ASSETS.src)
  .pipe(plumber())
  .pipe(gulp.dest(ASSETS.dest))
  .pipe(browserSync.reload({stream: true}));
});
