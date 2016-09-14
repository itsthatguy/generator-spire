import autoprefixer from 'autoprefixer';
import cssnano      from 'cssnano';
import sourcemaps   from 'gulp-sourcemaps';
import inject       from 'gulp-inject';
import sass         from 'gulp-sass';
import postcss      from 'gulp-postcss';
import filter       from 'gulp-filter';
import browserSync  from 'browser-sync';

const SASS = {
  src: config.PROJECT_ROOT + '/src/app/index.scss',
  dest: config.DIST,
  filter: '**/*.css',

  inject: {
    src: [
      path.join(`!${config.PROJECT_ROOT}`, 'src/app/index.scss'),
      path.join(config.PROJECT_ROOT, 'src/app/**/*.scss')
    ],
    options: {
      transform: function (filepath) {
        return '@import "' + filepath + '";';
      },
      starttag: '// inject:scss',
      endtag: '// endinject',
      addRootSlash: false
    }
  },

  options: {
    style: 'expanded',
    errLogToConsole: true,
    includePaths: [
      path.join(config.PROJECT_ROOT, 'src/app'),
      path.join(config.PROJECT_ROOT, 'src/assets/css'),
      path.join(config.PROJECT_ROOT, 'bower_components/foundation/scss')
    ]
  }
};

gulp.task('sass', function () {
  var injectSassSrc = gulp.src(SASS.inject.src, {read: false});

  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];

  return gulp.src(SASS.src)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(inject(injectSassSrc, SASS.inject.options))
  .pipe(
    sass(SASS.options)
    .on('error', sass.logError)
  )
  .pipe(postcss(processors))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(SASS.dest))
  .pipe(filter(SASS.filter))
  .pipe(browserSync.reload({stream: true}));
});
