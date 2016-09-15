import {isEmpty}    from 'lodash';
import gulpif       from 'gulp-if';
import inject       from 'gulp-inject';
import browserSync  from 'browser-sync';

import {VENDOR_ASSETS} from './assets-vendor';

// Move html, and inject <script> tags for
// all of the bower dependencies
const HTML = {
  src: 'src/app/index.html',
  dest: config.DIST,
  options: {pretty: true},
  inject: {
    src: path.join(config.PROJECT_ROOT + '/src/app/index.html'),
    head: {
      src: [],
      options: {
        name: 'head',
        addPrefix: '.',
        addRootSlash: false,
        removeTags: true
      }
    },
    googleAnalytics: {
      src: gulp.src(['/dev/null'], {read: false}),
      options: {
        starttag: '<!-- inject:googleAnalytics -->',
        endtag: '<!-- endinject -->',
        removeTags: true,
        transform: function () {
          var analyticsCode = config.env.googleAnalyticsCode;
          return `<script type='text/javascript'>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', '${analyticsCode}', 'auto');
      ga('send', 'pageview');
    </script>`;
        }
      }
    },
    vendor: {
      src: VENDOR_ASSETS,
      options: {
        name: 'vendor',
        addPrefix: '.',
        addRootSlash: false,
        removeTags: true
      }
    }
  }
};

gulp.task('html', function() {
  var bowerSrc = gulp.src(HTML.inject.vendor.src, {read: false});
  var headSrc  = gulp.src(HTML.inject.head.src, {read: false});

  gulp.src(HTML.src)
  .pipe(plumber())
  .pipe(gulpif((!isEmpty(config.env.googleAnalyticsCode)),
    inject(HTML.inject.googleAnalytics.src, HTML.inject.googleAnalytics.options)
  ))
  .pipe(inject(bowerSrc, HTML.inject.vendor.options))
  .pipe(inject(headSrc,  HTML.inject.head.options))
  .pipe(gulp.dest(HTML.dest))
  .pipe(browserSync.reload({stream:true}));
});
