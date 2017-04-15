import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const enhancer = typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f;

  const finalStore = compose(enhancer)(
    createStore,
  );

  return finalStore(rootReducer, initialState);
}
