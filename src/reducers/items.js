import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  selected: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEM_REQUEST:
      return {
        ...state,
        isFetching: false,
      };

    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selected: {
          ...action.payload.data,
          ...action.payload.item,
        },
      };

    case FETCH_ITEM_FAILURE:
      return {
        ...state,
        isFetching: false,
        selected: undefined,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
