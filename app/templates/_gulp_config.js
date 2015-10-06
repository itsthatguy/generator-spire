/* global environment, path, $, config */
'use strict';

global.config = {};
config.PROJECT_ROOT = path.join(__dirname, '..');
config.DIST = path.join(config.PROJECT_ROOT, 'dist');

var envAssets = require('./environment/' + environment);

var vendorAssetsOther = [];
config.VENDOR_ASSETS = $.mainBowerFiles().concat(vendorAssetsOther, envAssets.vendor);

config.assets = {
  src: config.PROJECT_ROOT + '/src/**/*.{png,jpg,ttf,html,ico,svg}',
  dest: config.DIST
};

config.assetsData = {
  src: path.join(config.PROJECT_ROOT, '/src/data/**/*.*'),
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

config.lint = {
  src: [
    config.PROJECT_ROOT + '/src/**/*.{jsx,js}',
    config.PROJECT_ROOT + '/gulp/**/*.js',
    config.PROJECT_ROOT + '/gulpfile.js',
    config.PROJECT_ROOT + '/webpack.config.js'
  ],
  reporter: 'jshint-stylish'
};

config.sass = {
  src: config.PROJECT_ROOT + '/src/app/index.scss',
  dest: config.DIST,
  filter: '**/*.css',

  inject: {
    src: [path.join(config.PROJECT_ROOT, 'src/app/**/*.scss')],
    options: {
      transform: (filepath) => {
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

config.serve = {
  browserSyncOptions: {
    server: {
      baseDir: config.DIST,
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  }
};

config.watch = {
  assets: {
    task: 'assets',
    src: path.join(config.PROJECT_ROOT, '/src/**/*.{png,jpg,html,ttf,ico,svg}')
  },
  assetsData: {
    task: 'assets:data',
    src: config.assetsData.src
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
    src: config.PROJECT_ROOT + '/src/**/*.{js,jsx}'
  },
  lint: {
    task: 'lint',
    src: config.lint.src
  },
  sass: {
    task: 'sass',
    src: config.PROJECT_ROOT + '/src/**/*.scss'
  },
};

module.exports = config;
