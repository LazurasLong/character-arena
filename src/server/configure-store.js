import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

// Custom Middlewares
import api from '../middlewares/api';

export default function configureStore(initialState) {
  /*
  const composeEnhancers = typeof window !== 'undefined' && window.devToolsExtension
    ? window.devToolsExtension()
    : compose;

  const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk, api)
  ));

  return store;
  */

  const enhancer = (typeof window !== 'undefined' && typeof window.devToolsExtension !== 'undefined')
    ? window.devToolsExtension()
    : f => f;

  const finalStore = compose(applyMiddleware(thunk, api), enhancer)(
    createStore,
  );

  return finalStore(reducers, initialState);

}
