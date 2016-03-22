global.gulp = require('gulp');
global.path = require('path');
global.plumber = require('gulp-plumber');
global.gutil = require('gulp-util');
global.environment = process.env.NODE_ENV || 'development';

require('./config');

var bulk = require('bulk-require');
bulk(__dirname, ['./tasks/*']);

gulp.task('watch-pre-task', ['clean', 'assets', 'sass', 'html', 'assets:vendor', 'lint']);
gulp.task('default', ['watch-pre-task', 'js']);
