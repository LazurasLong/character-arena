import { combineReducers } from 'redux';

import resources from './resources.js';
import characters from './characters.js';
import items from './items.js';

export default combineReducers({
  resources,
  characters,
  items,
});
