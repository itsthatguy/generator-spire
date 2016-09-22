import path                   from 'path';
import express                from 'express';
import exec                   from 'child_process';
import {reactReduxMiddleware} from './src/lib/reactReduxMiddleware';

import config from './src/config/environment/production';
global.CONFIG = config;

var app = express();

var staticPath = path.resolve(__dirname, 'dist');
var bowerPath = path.resolve(__dirname, 'dist/bower_components');
app.use('/bower_components', express.static(bowerPath));
app.use(express.static(staticPath));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

function productionCallback () {
  console.log('EXPRESS: Now listening');
  exec('touch /tmp/app-initialized');
  console.log('NGINX: App Initialized');
}

function developmentCallback () {
  console.log('EXPRESS: Now listening');
}

var appListenPort = process.env.PORT || 3002;
var appListenCallback = developmentCallback;

var isProduction = (process.env.NODE_ENV === 'production');
var isTestingIso = (process.env.ISO_TEST === 'True');

if (isProduction && !isTestingIso) {
  appListenPort = '/tmp/nginx.socket';
  appListenCallback = productionCallback;
}

app.listen(appListenPort, developmentCallback);

app.use(reactReduxMiddleware());
