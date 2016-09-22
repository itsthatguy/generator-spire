// run a server for development with browsersync
import webpack              from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxyMiddleware      from 'http-proxy-middleware';
import historyApiFallback   from 'connect-history-api-fallback';
import browserSync          from 'browser-sync';
import {JS}                 from './javascript';
<% if (flux === 'redux') { %>
import {reactReduxMiddleware} from '../../src/lib/reactReduxMiddleware';
<% } %>

const SERVE = {
  bundler: webpack(JS.webpackOptions),
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

var preTasks = (config.STANDALONE) ? ['watch', 'mock'] : ['watch'];

gulp.task('serve', preTasks, function() {
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
    webpackDevMiddleware(SERVE.bundler, {
      publicPath: JS.webpackOptions.output.publicPath,
      stats: {colors: true}
    }),
    webpackHotMiddleware(SERVE.bundler),<% if (flux === 'redux') { %>
    reactReduxMiddleware(),
    <% } %>historyApiFallback()
  );

  SERVE.browserSyncOptions.middleware = middlewares;
  browserSync.init(SERVE.browserSyncOptions);
});
