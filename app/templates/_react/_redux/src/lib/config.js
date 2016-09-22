import path from 'path';

var environment;
var environmentConfig;

if (typeof global === 'object') {
  environment       = process.env.NODE_ENV || 'development';
  environmentConfig = require(path.join(__dirname, '..', 'config', 'environment', environment + '.js'));
}

var CONFIG = CONFIG || JSON.stringify(environmentConfig);

export default CONFIG;
