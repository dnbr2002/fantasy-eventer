import './views/styles/styles.css';
import '../node_modules/toastr/build/toastr.min.css';


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { initAuth } from './auth';
import history from './history';
import configureStore from './store';
import registerServiceWorker from './utils/register-service-worker';
import App from './views/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5472d3',
      main: '#0d47a1',
      dark: '#002171',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ff6659',
      main: '#d32f2f',
      dark: '#9a0007',
      contrastText: '#ffffff',
    },
    appBar: {
      color: 'primary',
    },
  }
});

const store = configureStore();
const rootElement = document.getElementById('root');


function render(Component) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Component />
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
