import React            from 'react';
import connectToStores  from 'alt/utils/connectToStores';

import HomeActions from '../../src/app/Home/HomeActions';
import HomeStore   from '../../src/app/Home/HomeStore';

class Sample extends React.Component {
  static getStores () {
    return [HomeStore];
  }

  static getPropsFromStores () {
    return HomeStore.getState();
  }

  render () {
    return (<h1>Hello</h1>);
  }
}

export default connectToStores(Sample);
