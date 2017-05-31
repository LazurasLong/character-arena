import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  FETCH_ITEMSET_ITEM_REQUEST,
  FETCH_ITEMSET_ITEM_SUCCESS,
  FETCH_ITEMSET_ITEM_FAILURE,
  UPDATE_ITEMSET_ITEM,
  UNSELECT_ITEM,
} from '../constants/actionTypes';

import {
  ITEM,
} from '../constants/apiRoutes';

import { CALL_API } from '../middlewares/api';

import { composeUrl } from '../utils/calcs';

const fetchItem = ({
  item,
  region,
  language,
}) => {
  return {
    [CALL_API]: {
      endpoint: `${composeUrl({
        url: ITEM,
        itemId: item.id,
        region,
        language,
      })}`,
      types: [
        FETCH_ITEM_REQUEST,
        FETCH_ITEM_SUCCESS,
        FETCH_ITEM_FAILURE,
      ],
      extra: {
        item,
      }
    },
  };
};

const fetchItemSetItem = ({
  item,
  region,
  language,
}) => {
  return {
    [CALL_API]: {
      endpoint: `${composeUrl({
        url: ITEM,
        itemId: item,
        region,
        language,
      })}`,
      types: [
        FETCH_ITEMSET_ITEM_REQUEST,
        FETCH_ITEMSET_ITEM_SUCCESS,
        FETCH_ITEMSET_ITEM_FAILURE,
      ],
      extra: {
        item,
      }
    },
  };
}

const updateItemSetItem = ({
  item,
}) => {
  return {
    type: UPDATE_ITEMSET_ITEM,
    item,
  };
};

const unselectItem = () => {
  return {
    type: UNSELECT_ITEM,
  };
}

export {
  fetchItem,
  fetchItemSetItem,
  updateItemSetItem,
  unselectItem,
};
