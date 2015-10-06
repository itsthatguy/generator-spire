/* eslint "no-console": 0 */
var _           = require('lodash');
var path        = require('path');
var webpack     = require('webpack');
var environment = process.env.NODE_ENV || 'development';

var applicationConfig = require(path.join(__dirname, 'src', 'config', 'application.js'));
var environmentConfig = require(path.join(__dirname, 'src', 'config', 'environment', environment + '.js'));
var mergedConfig = _.merge(applicationConfig, environmentConfig);

console.log('ENVIRONMENT: ', environment);

module.exports = {
  devtool: '#source-map',
  output: {
    filename: '[name].js',
    sourcemapFilename: '[name].map'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(mergedConfig)
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
