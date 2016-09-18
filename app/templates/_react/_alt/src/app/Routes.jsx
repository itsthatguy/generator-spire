/* eslint no-unused-vars: [2, {"varsIgnorePattern": "^React"}] */
import {Router, Route, IndexRoute} from 'react-router';
import React    from 'react';
import history  from '../lib/history';

import App      from './App';
import Home     from './Home/Home';

// declare our routes and their hierarchy
let routes = (
  <Route path="/" component={App}>
    <Route path="home" component={Home}/>

    <IndexRoute component={Home}/>
  </Route>
);

export default <Router history={history} routes={routes}/>;
