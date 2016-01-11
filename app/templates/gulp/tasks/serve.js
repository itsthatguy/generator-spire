/* global config, $ */
// run a server for development with browsersync
var preTasks = (config.STANDALONE) ? ['watch', 'mock'] : ['watch'];

gulp.task('serve', preTasks, function() {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var proxyMiddleware = require('http-proxy-middleware');
  var historyApiFallback = require('connect-history-api-fallback');

  var middlewares = [];
  if (config.STANDALONE) {
    middlewares.push(proxyMiddleware('/api/**/*', {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '' },
      proxyTable: {
        'localhost:3000': 'http://localhost:8090'
      }
    }));
  }

  middlewares.push(
    webpackDevMiddleware(config.js.bundler, {
      publicPath: config.js.webpackOptions.output.publicPath,
      stats: {colors: true}
    }),
    webpackHotMiddleware(config.js.bundler),
    historyApiFallback()
  );

  config.serve.browserSyncOptions.middleware = middlewares;
  $.browserSync.init(config.serve.browserSyncOptions);
});
