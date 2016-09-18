import alt from '../../lib/alt';
import HomeActions from './HomeActions';

// Store
class HomeStore {
  constructor () {
    this.bindActions(HomeActions);

    this.state = {
      title: 'My Home Page'
    };
  }

  onSetTitle (title) {
    this.setState({title: title});
  }
}

export default alt.createStore(HomeStore, 'HomeStore');
