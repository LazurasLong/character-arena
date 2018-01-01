// import debug from 'debug';
// const log = debug('samyroad:routes');

import React from 'react';
import { Route } from 'react-router';

import App from './components/App.jsx';
import Comparator from './containers/Comparator.jsx';
import Payment from './containers/Payment.jsx';

import {
  HOME,
  COMPARE,
  PAYMENT,
} from './constants/appRoutes.js';

export default (store) => (
  <Route component={App}>
    <Route
      path={HOME}
      component={Comparator}
    />
    <Route
      path={COMPARE}
      component={Comparator}
    />
    <Route
      path={'/payment'}
      component={Payment}
    />
  </Route>
);
