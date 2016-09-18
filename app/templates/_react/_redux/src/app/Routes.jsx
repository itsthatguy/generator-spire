/* eslint no-unused-vars: [2, {"varsIgnorePattern": "^(React|root)"}] */
import React from 'react';

import {Route} from 'react-router';

import Home     from './Home/Home';
import {setTitle} from './actions/home';

function foo () {
  console.log('foo');
}

// Export only the <Route>'s and define the Provider & Router in client & server
export default <Route path='/' component={Home} />;
