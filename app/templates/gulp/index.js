global.gulp = require('gulp');
global.path = require('path');
global.plumber = require('gulp-plumber');
global.gutil = require('gulp-util');
global.environment = process.env.NODE_ENV || 'development';

global.config = {};
config.PROJECT_ROOT = path.join(__dirname, '..');
config.DIST = path.join(config.PROJECT_ROOT, 'dist');
config.STANDALONE = process.env.STANDALONE === 'true';

config.env = require('./environment/' + environment);

import bulk from 'bulk-require';
bulk(__dirname, ['./tasks/*']);

gulp.task('default', ['watch-pre-task', 'js']);
