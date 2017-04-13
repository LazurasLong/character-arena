import { combineReducers } from 'redux';

import characters from './characters.js';
import resources from './resources.js';

export default combineReducers({
  characters,
  resources,
});
