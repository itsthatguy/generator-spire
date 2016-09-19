import React                                       from 'React';
import {renderToString}                            from 'react-dom/server';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import {Provider}                                  from 'react-redux';
import AsyncProps, {loadPropsOnServer}             from 'async-props';
import {syncHistoryWithStore}                      from 'react-router-redux';

import {configureStore}                            from '../app/store';

import routes                                      from '../app/Routes.jsx';
import {initialState as homeInitialState}          from '../app/Home/Home';

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

export const reactReduxMiddleware = async function (request, response, next) {
  let initialState = {
    home: await homeInitialState()
  };

  const memoryHistory = createMemoryHistory(request.url);
  const store = configureStore(memoryHistory, initialState);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({history, routes, location: request.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      response.statusCode = 500;
      response.write(error.message);
    } else if (redirectLocation) {
      response.writeHead(302, {
        Location: redirectLocation.pathname + redirectLocation.search
      });
    } else if (renderProps) {
      let content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      response.write('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>));
    } else {
      response.statusCode = 404;
      response.write('Not found');
    }
    response.end();
  });
};

