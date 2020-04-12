// import './views/styles/styles.css';
import '../node_modules/toastr/build/toastr.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'assets/index.scss'


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { initAuth } from './auth';
import history from './history';
import configureStore from './store';
import registerServiceWorker from './utils/register-service-worker';
import App from './views/app';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import theme from 'common/theme';

const store = configureStore();
const rootElement = document.getElementById('root');


function render(Component) {
  console.log("ReactVersion::",React.version);
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
        {/* <ConfirmProvider> */}
          <Component />
          {/* </ConfirmProvider> */}
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>,
    rootElement
  );
}


if (module.hot) {
  module.hot.accept('./views/app', () => {
    render(require('./views/app').default);
  })
}


registerServiceWorker();


initAuth(store.dispatch)
  .then(() => render(App))
  .catch(error => console.error(error));
