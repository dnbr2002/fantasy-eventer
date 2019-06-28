// import './views/styles/styles.css';
import '../node_modules/toastr/build/toastr.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css'
import '../src/assets/index.scss'


import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { initAuth } from './auth';
import history from './history';
import configureStore from './store';
import registerServiceWorker from './utils/register-service-worker';
import App from './views/app';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import { createMuiTheme } from '@material-ui/core/styles';
// import { white, black } from '../src/common/colors';
import theme from '../src/common/theme';
// const theme = createMuiTheme({
//   palette: {
//     common: {
//       black,
//       white,
//       neutral: '#E4E7EB',
//       muted: '#9EA0A4'
//     },
//     primary: {
//       light: '#5472d3',
//       main: '#0d47a1',
//       dark: '#002171',
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       light: '#ff6659',
//       main: '#d32f2f',
//       dark: '#9a0007',
//       contrastText: '#ffffff',
//     },
//     danger: {
//       contrastText: white,
//       main: '#ED4740',
//       light: '#FEF6F6',
//       dark: '#BF0E08'
//     },
//     appBar: {
//       color: 'primary',
//     },
//     text: {
//       primary: '#12161B',
//       secondary: '#66788A',
//       disabled: '#A6B1BB'
//     },
//     background: {
//       default: '#f8fafc',
//       dark: '#172B4D',
//       paper: white
//     },
//     border: '#DFE3E8',
//     divider: '#DFE3E8'
//   }
// });

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
