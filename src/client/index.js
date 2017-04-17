import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import thunk from 'redux-thunk';


// require the scss and do nothing to expose it to webpack
import '../styles/main.scss';

// IMPORTANT: This require is making favicons work. Do not remove
require.context('../images/favicons/', false, /\.png$/);

// Application
import configureStore from '../server/configure-store.js';
import Routes from '../routes.jsx';

import { SLUG } from '../constants/app.js';

// Custom Middlewares
import api from '../middlewares/api';

import reducers from '../reducers';

const store = configureStore();
const rootElement = document.getElementById(SLUG);

ReactDOM.render(
  <Provider store={store || {}}>
    <Router
      routes={Routes(store)}
      history={browserHistory || {}}
      render={applyRouterMiddleware()}
    />
  </Provider>,
  rootElement,
);
