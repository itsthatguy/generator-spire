import React            from 'react';
import {Router, Route, Redirect, IndexRoute} from 'react-router';
import history          from '../lib/history';

import Home             from './Home/Home';

let App = React.createClass({
  render () {
    return (
      <div className='app__wrapper'>
        {this.props.children}
      </div>
    );
  }
});

// declare our routes and their hierarchy
let routes = (
  <Route path="/" component={App}> 
    <Route path="home" component={Home}/>

    <IndexRoute component={Home}/>
  </Route>
);

React.render((
  <Router history={history} routes={routes}/>
), document.getElementById('content'));
