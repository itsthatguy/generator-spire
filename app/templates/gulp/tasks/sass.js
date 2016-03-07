/* global config, $ */
gulp.task('sass', function() {
  var injectSassSrc = gulp.src(config.sass.inject.src, {read: false});

  var autoprefixer = require('autoprefixer');
  var cssnano = require('cssnano');

  var processors = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];

  return gulp.src(config.sass.src)
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.inject(injectSassSrc, config.sass.inject.options))
  .pipe(
    $.sass(config.sass.options)
    .on('error', $.sass.logError)
  )
  .pipe($.postcss(processors))
  .pipe($.sourcemaps.write())
  .pipe(gulp.dest(config.sass.dest))
  .pipe($.filter(config.sass.filter))
  .pipe($.browserSync.reload({stream: true}));
});
