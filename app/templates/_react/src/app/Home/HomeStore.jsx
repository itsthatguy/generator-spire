import alt from '../../lib/alt';
import HomeActions from './HomeActions';

// Store
class HomeStore {
  constructor () {
    this.bindActions(HomeActions);

    this.state = { };
  } 
}

export default alt.createStore(HomeStore, 'HomeStore');
