import alt  from '../../lib/alt';

class HomeActions {
  constructor () {
    this.generateActions('setTitle');
  }
}

export default alt.createActions(HomeActions);
