import del         from 'del';
import browserSync from 'browser-sync';
import webpack     from 'webpack-stream';

export const JS = {
  src: path.join(config.PROJECT_ROOT, 'src/app/index.{jsx,js}'),
  dest: config.DIST,
  webpackOptions: require(path.join(config.PROJECT_ROOT, 'webpack.config.js')),
};

gulp.task('js', function() {
  del.sync(path.join(config.DIST, '/main.js'));

  return gulp.src(JS.src)
  .pipe(plumber())
  .pipe(webpack(JS.webpackOptions))
  .pipe(gulp.dest(JS.dest))
  .pipe(browserSync.reload({stream:true}));
});
