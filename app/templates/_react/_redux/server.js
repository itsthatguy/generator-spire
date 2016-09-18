import path                                        from 'path';
import express                                     from 'express';
import exec                                        from 'child_process';

import React                                       from 'React';
import {renderToString}                            from 'react-dom/server';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import {Provider}                                  from 'react-redux';
import AsyncProps, {loadPropsOnServer}             from 'async-props';
import {syncHistoryWithStore}                      from 'react-router-redux';

import {configureStore}                            from './src/app/store';

import {initialState as homeInitialState}          from './src/app/Home/Home';


import config from './src/config/environment/production';
global.CONFIG = config;
import routes from './src/app/Routes.jsx';

var app = express();

var staticPath = path.resolve(__dirname, 'dist');
var bowerPath = path.resolve(__dirname, 'dist/bower_components');
app.use('/bower_components', express.static(bowerPath));
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

const HTML = ({ content, store }) => {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
        <div id="devtools"/>
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${JSON.stringify(store.getState())};` }}/>
        <script src="/main.js"/>
      </body>
    </html>
  )
};

app.use(async function (request, response, next) {
  let initialState = {
    home: await homeInitialState()
  };

  const memoryHistory = createMemoryHistory(request.url);
  const store = configureStore(memoryHistory, initialState);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({history, routes, location: request.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      let content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      response.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>));
    } else {
      response.status(404).send('Not found');
    }
  });

});

