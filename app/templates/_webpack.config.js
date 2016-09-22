var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var environment = process.env.NODE_ENV || 'development';
var docker = process.env.DOCKER === 'true';

var ForceCaseSensitivityPlugin = function () {};
ForceCaseSensitivityPlugin.prototype.apply = function (compiler) {
  compiler.plugin('normal-module-factory', function(nmf) {
    nmf.plugin('after-resolve', function(data, done) {
      var parentDir = path.dirname(data.resource);
      var resourceName = path.basename(data.resource);

      fs.readdir(parentDir, function(err, files) {
        if (err) { done(err); }

        if (files.indexOf(resourceName) === -1) {
          var realName = _.find(files, function(filename) {
            return filename.toLowerCase() === resourceName.toLowerCase();
          });

          var error = new Error('ForceCaseSensitivityPlugin: `'
            + resourceName
            + '` does not match the corresponding file on disk `'
            + realName + '`');

          done(error);
          if (environment !== 'development') {
            throw error;
          }
          return;
        }
        done(null, data);
      });
    });
  });
};

var environmentConfig = require(path.join(__dirname, 'src', 'config', 'environment', environment + '.js'));
environmentConfig.environment = environment;
environmentConfig.docker = docker;

var devtool;

var entry = [];

var plugins = [
  new ForceCaseSensitivityPlugin(),
  new webpack.DefinePlugin({
    CONFIG: JSON.stringify(environmentConfig)
  })
];

function getLoader (name) {
  return {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: name,
    query: <%- babelRc %>
  };
}

var jsLoaders = [getLoader('babel-loader')];

<% if (react) { %>
plugins.push(
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin()
);
<% } %>
if (environment === 'development' && !docker) {
  devtool = '#inline-source-map';
<% if (react) { %>
  entry = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client'
  ];

  plugins.push(new webpack.HotModuleReplacementPlugin());

  // react-hot must be ordered before babel-loader
  jsLoaders = [
    getLoader('react-hot'),
    getLoader('babel-loader')
  ];
<% } %>
} else if (environment === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}

module.exports = {
  devtool: devtool,
  context: path.join(__dirname, 'src', 'app'),
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    sourcemapFilename: '[name].map',
    publicPath: '/'
  },

  entry: entry.concat('./index.jsx'),

  plugins: plugins,

  module: {
    loaders: jsLoaders
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
