import {
  FETCH_CHARACTER_REQUEST,
  FETCH_CHARACTER_SUCCESS,
  FETCH_CHARACTER_ERROR,
} from '../constants/actionTypes.js';

const isTheSameCharacter = (original, compared) => {
  const result = (original.name === compared.name && original.realm === compared.realm);

  console.log('isTheSameCharacter', result);
  return result;
};

const isInCollection = (collection, character) => {
  const result = collection.findIndex(char => isTheSameCharacter(char, character)) >= 0;

  console.log('isInCollection', result);
  return result;
}

const character = (state, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_SUCCESS:
      if (isTheSameCharacter(state, action.payload.data)) {
        return {
          ...action.payload.data,
        };
      }
      return state;

    default:
      return state;
  }
};

const initialState = {
  collection: [],
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHARACTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };

    case FETCH_CHARACTER_SUCCESS:
      console.log('New character fetched');

      return {
        ...state,
        collection: isInCollection(state.collection, action.payload.data)
          ? [...state.collection.map(char => character(char, action))]
          : [...state.collection, {...action.payload.data}],
        isFetching: false,
        error: undefined,
      };
    
    case FETCH_CHARACTER_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };

    default:
      return state;

  }
};
