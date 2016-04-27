var mainBowerFiles = require('main-bower-files');

global.config = {};
config.PROJECT_ROOT = path.join(__dirname, '..');
config.DIST = path.join(config.PROJECT_ROOT, 'dist');
config.STANDALONE = process.env.STANDALONE === 'true';

config.env = require('./environment/' + environment);

var vendorAssetsOther = [
  path.join('bower_components', 'foundation-icon-fonts', '**/*.{eot,svg,ttf,woff}')
];
config.VENDOR_ASSETS = mainBowerFiles().concat(vendorAssetsOther, config.env.vendor);

config.assets = {
  src: [
    `!${config.PROJECT_ROOT}/src/app/index.html`,
    `${config.PROJECT_ROOT}/src/**/*.{png,jpg,mp4,eot,svg,ttf,woff,html,ico,svg}`,
    `${config.PROJECT_ROOT}/src/CNAME`
  ],
  dest: config.DIST
};

config.assetsVendor = {
  src: config.VENDOR_ASSETS,
  dest: config.DIST
};

config.build = {
  src: config.PROJECT_ROOT + '',
  dest: config.DIST
};

config.clean = {
  src: config.PROJECT_ROOT + '/dist/**/*'
};

config.html = {
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
      src: config.VENDOR_ASSETS,
      options: {
        name: 'vendor',
        addPrefix: '.',
        addRootSlash: false,
        removeTags: true
      }
    }
  }
};

config.js = {
  src: config.PROJECT_ROOT + '/src/app/index.{jsx,js}',
  dest: config.DIST,
  webpackOptions: require(config.PROJECT_ROOT + '/webpack.config.js'),
};

config.lintJs = {
  src: [
    config.PROJECT_ROOT + '__tests__/**/*.{jsx,js}',
    config.PROJECT_ROOT + '/src/**/*.{jsx,js}',
    config.PROJECT_ROOT + '/gulp/**/*.js',
    config.PROJECT_ROOT + '/gulpfile.js',
    config.PROJECT_ROOT + '/webpack.config.js'
  ],
};

config.sass = {
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
      path.join(config.PROJECT_ROOT, '/src/app'),
      path.join(config.PROJECT_ROOT, '/src/assets/css'),
      path.join(config.PROJECT_ROOT, '/bower_components/foundation/scss')
    //   require('node-bourbon').includePaths
    ]
  }
};

config.lintSass = {
  src: path.join(config.PROJECT_ROOT, '/src/**/*.scss'),
  options: require(`${config.PROJECT_ROOT}/.sasslint.js`),
};

var webpack = require('webpack');

config.js.bundler = webpack(config.js.webpackOptions);

config.serve = {
  browserSyncOptions: {
    open: false,
    https: false,
    server: {
      baseDir: config.DIST,
      routes: {
        '/bower_components': 'bower_components'
      },
    },
    files: [
      'app/css/*.css',
      'app/*.html'
    ]
  }
};

config.watch = {
  assets: {
    task: 'assets',
    src: config.assets.src
  },
  assetsVendor: {
    task: 'assets:vendor',
    src: config.PROJECT_ROOT + '/bower_components/*.{css,js}'
  },
  html: {
    task: 'html',
    src: config.PROJECT_ROOT + '/src/**/*.html'
  },
  js: {
    task: 'js',
    src: config.PROJECT_ROOT + '/src/**/*.{jsx,js}'
  },
  lintJs: {
    task: 'lint-js',
    src: config.lintJs.src
  },
  sass: {
    task: 'sass',
    src: config.PROJECT_ROOT + '/src/**/*.scss'
  },
  lintSass: {
    task: 'lint-sass',
    src: config.PROJECT_ROOT + '/src/**/*.scss'
  }
};

module.exports = config;
