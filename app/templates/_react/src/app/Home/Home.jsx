import React            from 'react';
import connectToStores  from 'alt/utils/connectToStores';

import HomeStore   from './HomeStore';
import HomeActions from './HomeActions';

class Home extends React.Component {

  static getStores () {
    return [HomeStore];
  }

  static getPropsFromStores () {
    return HomeStore.getState();
  }

  componentWillMount () { }

  componentWillReceiveProps () { }

  render () {
    return (
      <div className='home__wrapper'>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default connectToStores(Home);
