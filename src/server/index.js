import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import api from '../middlewares/api';
import { Router, Route, browserHistory } from 'react-router';

import { SLUG } from '../constants/app.js';

import '../styles/main.scss';
import App from '../components/App.jsx';
import Comparator from '../containers/Comparator.jsx';

// const finalStore = compose(
//   applyMiddleware(thunk, api),
// )(createStore);

// const store = finalStore(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk, api)
));

ReactDOM.render(
  <Provider store={store || {}}>
    <Router history={browserHistory || {}}>
      <Route component={ App }>
        <Route
          path="/"
          component={ Comparator }
        />
      </Route>
    </Router>
  </Provider>,
  document.getElementById(SLUG)
);
