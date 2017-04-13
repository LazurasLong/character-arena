import '../styles/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

// Application
import { SLUG } from '../constants/app.js';
import Routes from '../routes.jsx';

// Custom Middlewares
import api from '../middlewares/api';

import reducers from '../reducers';

import App from '../components/App.jsx';
import Comparator from '../containers/Comparator.jsx';

import {
  HOME,
  COMPARE,
} from '../constants/appRoutes.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk, api)
));

ReactDOM.render(
  <Provider store={store || {}}>
    <Router history={browserHistory || {}}>
  <Route component={App}>
    <Route
      path={HOME}
      component={Comparator}
    />
    <Route
      path={COMPARE}
      component={Comparator}
    />
  </Route>
    </Router>
  </Provider>,
  document.getElementById(SLUG)
);
