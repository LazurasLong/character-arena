// import debug from 'debug';
// const log = debug('samyroad:routes');

import React from 'react';
import { Route } from 'react-router';

import App from './components/App.jsx';
import Comparator from './containers/Comparator.jsx';

import {
  HOME,
  COMPARE,
} from './constants/appRoutes.js';

export default () => (
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
);
