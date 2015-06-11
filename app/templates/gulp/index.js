'use strict';

global.gulp = require('gulp');
global.path = require('path');
global.environment = process.env.NODE_ENV || 'development';

global.$ = require('gulp-load-plugins')({
  pattern: [
    'gulp-*',
    'del',
    'main-bower-files',
    'browser-sync',
    'tosource']
});

require('./config');

var bulk = require('bulk-require');
bulk(__dirname, ['gulp/tasks/*']);

gulp.task('default', ['clean', 'assets', 'js', 'sass', 'jade', 'assets:vendor', 'assets:data', 'lint']);
