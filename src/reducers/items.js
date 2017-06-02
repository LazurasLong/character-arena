import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  FETCH_ITEMSET_ITEM_REQUEST,
  FETCH_ITEMSET_ITEM_SUCCESS,
  FETCH_ITEMSET_ITEM_FAILURE,
  UPDATE_ITEMSET_ITEM,
  FETCH_TRANSMOG_ITEM_REQUEST,
  FETCH_TRANSMOG_ITEM_SUCCESS,
  FETCH_TRANSMOG_ITEM_FAILURE,
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
        isFetching: true,
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

    case FETCH_ITEMSET_ITEM_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };

    case FETCH_ITEMSET_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selected: {
          ...state.selected,
          itemSet: {
            ...state.selected.itemSet,
            items: state.selected.itemSet.items.map(i => {
              if (!i.id && i === action.payload.data.id) {
                return action.payload.data;
              }
              return i;
            }),
          },
        },
        error: undefined,
      };

    case FETCH_ITEMSET_ITEM_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };

    case UPDATE_ITEMSET_ITEM:
      return {
        ...state,
        selected: {
          ...state.selected,
          itemSet: {
            ...state.selected.itemSet,
            items: state.selected.itemSet.items.map(i => {
              if (!i.id && i === action.item.id) {
                return action.item;
              }
              return i;
            }),
          },
        },
      };

    case UNSELECT_ITEM:
      return {
        ...state,
        isFetching: false,
        selected: undefined,
        error: undefined,
      };

    case FETCH_TRANSMOG_ITEM_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case FETCH_TRANSMOG_ITEM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selected: {
          ...state.selected,
          transmogItem: action.payload.data,
        },
        error: undefined,
      };
    case FETCH_TRANSMOG_ITEM_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
