import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  UNSELECT_ITEM,
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
        error: undefined,
      };

    case FETCH_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selected: {
          ...action.payload.data,
          ...action.payload.item,
        },
        error: undefined,
      };

    case FETCH_ITEM_FAILURE:
      return {
        ...state,
        isFetching: false,
        selected: undefined,
        error: action.payload.error,
      };

    case UNSELECT_ITEM: {
      return {
        ...state,
        isFetching: false,
        selected: undefined,
        error: undefined,
      }
    }

    default:
      return state;
  }
};
