import ReactDOM from 'react-dom';
import Routes   from './Routes';

let rootInstance = null;

rootInstance = ReactDOM.render(Routes, document.getElementById('content'));

if (CONFIG.environment === 'development' && module.hot && !CONFIG.docker) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [rootInstance];
    }
  });
}
