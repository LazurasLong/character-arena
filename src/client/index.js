import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga';

// require the manifest.json
import '../manifest.json';

// require the scss and do nothing to expose it to webpack
import '../styles/main.scss';

// IMPORTANT: This require is making favicons work. Do not remove
require.context('../images/', false, /\.(jpe?g|png|gif|svg)?$/);
require.context('../images/favicons/', false, /\.png$/);

// Application
import configureStore from '../server/configure-store.js';
import Routes from '../routes.jsx';

import { SLUG } from '../constants/app.js';
import { ANALYTICS_TAG, ENV } from '../../.env.js';

// Custom Middlewares
import api from '../middlewares/api';

import reducers from '../reducers';

const { initialState } = __INITIAL_DATA__;
const store = configureStore(initialState);
const rootElement = document.getElementById(SLUG);

if (!ENV || ENV !== 'dev') {
  ReactGA.initialize(ANALYTICS_TAG);
}

const logPageView = () => {
  if (!ENV || ENV !== 'dev') {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }
};

ReactDOM.render(
  <Provider store={store || {}}>
    <Router
      routes={Routes(store)}
      history={browserHistory || {}}
      render={applyRouterMiddleware()}
      onUpdate={logPageView}
    />
  </Provider>,
  rootElement,
);
