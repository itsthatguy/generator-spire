/* eslint no-unused-vars: [2, {"varsIgnorePattern": "^(React|root)"}] */
import React from 'react';

import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, compose, combineReducers } from 'redux';
import applyMiddleware from 'redux-wait';
import thunk        from 'redux-thunk';
import PromiseMiddleware from 'redux-promise';

import * as reducers from './reducers/index';

const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
);

export function configureStore(history, initialState) {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  let devTools = [];
  if (typeof document !== 'undefined') {
    devTools = [ DevTools.instrument() ];
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        PromiseMiddleware,
        routerMiddleware(history)
      ),
      ...devTools
    )
  );

  return store;
}
