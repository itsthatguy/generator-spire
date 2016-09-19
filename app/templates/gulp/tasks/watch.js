// Watching the things:
// gulp.watch is limited and doesn't observe files that
// are added after the task is run, so we use gulp-watch
import watch from 'gulp-watch';
import {ASSETS} from './assets';

const WATCH = {
  assets: {
    task: 'assets',
    src: ASSETS.src
  },
  assetsVendor: {
    task: 'assets:vendor',
    src: path.join(config.PROJECT_ROOT, 'bower_components/*.{css,js}')
  },
  html: {
    task: 'html',
    src: path.join(config.PROJECT_ROOT, 'src/**/*.html')
  },
  js: {
    task: 'js',
    src: path.join(config.PROJECT_ROOT, 'src/**/*.{jsx,js}')
  },
  lintJs: {
    task: 'lint:js',
    src: require('./lint-js').LINT_JS.src
  },
  sass: {
    task: 'sass',
    src: path.join(config.PROJECT_ROOT, 'src/**/*.scss')
  },
  lintSass: {
    task: 'lint:sass',
    src: path.join(config.PROJECT_ROOT, 'src/**/*.scss')
  }
};

gulp.task('watch-pre-task', ['clean', 'assets', 'sass', 'html', 'assets:vendor', 'lint']);

gulp.task('watch', ['watch-pre-task'], function() {
  function setupWatch(src, task) {
    return watch(src, function() {
      gulp.start(task);
    });
  }

  setupWatch(WATCH.assets.src,       WATCH.assets.task);
  setupWatch(WATCH.assetsVendor.src, WATCH.assetsVendor.task);
  setupWatch(WATCH.html.src,         WATCH.html.task);
  setupWatch(WATCH.lintJs.src,       WATCH.lintJs.task);
  setupWatch(WATCH.sass.src,         WATCH.sass.task);
  setupWatch(WATCH.lintSass.src,     WATCH.lintSass.task);
});
