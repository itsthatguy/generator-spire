/* global environment, path, $, config */
global.config = {};
config.PROJECT_ROOT = path.join(__dirname, '..');
config.DIST = path.join(config.PROJECT_ROOT, 'dist');
config.STANDALONE = process.env.STANDALONE === 'true';

var envAssets = require('./environment/' + environment);

var vendorAssetsOther = [
  path.join('bower_components', 'foundation-icon-fonts', '**/*.{eot,svg,ttf,woff}')
];
config.VENDOR_ASSETS = $.mainBowerFiles().concat(vendorAssetsOther, envAssets.vendor);

config.assets = {
  src: config.PROJECT_ROOT + '/src/**/*.{png,jpg,mp4,ttf,html,ico,svg}',
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

config.jade = {
  src: ['src/**/*.jade', '!src/app/index.jade'],
  dest: config.DIST,
  options: {pretty: true},
  inject: {
    src: path.join(config.PROJECT_ROOT + '/src/app/index.jade'),
    options: {pretty: true},
    head: {
      src: [],
      options: {
        name: 'head',
        addPrefix: '.',
        addRootSlash: false
      }
    },
    vendor: {
      src: config.VENDOR_ASSETS,
      options: {
        name: 'vendor',
        addPrefix: '.',
        addRootSlash: false
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
    src: [path.join(config.PROJECT_ROOT, 'src/app/**/*.scss')],
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
      path.join(config.PROJECT_ROOT, '/src/assets/stylesheets'),
      path.join(config.PROJECT_ROOT, '/bower_components/foundation/scss'),
      require('node-bourbon').includePaths
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
    src: path.join(config.PROJECT_ROOT, '/src/**/*.{png,mp4,jpg,html,ttf,ico,svg}')
  },
  assetsVendor: {
    task: 'assets:vendor',
    src: config.PROJECT_ROOT + '/bower_components/*.{css,js}'
  },
  jade: {
    task: 'jade',
    src: config.PROJECT_ROOT + '/src/**/*.jade'
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
