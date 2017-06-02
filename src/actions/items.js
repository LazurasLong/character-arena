import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
  FETCH_INFO_ITEM_REQUEST,
  FETCH_INFO_ITEM_SUCCESS,
  FETCH_INFO_ITEM_FAILURE,
  FETCH_ITEMSET_ITEM_REQUEST,
  FETCH_ITEMSET_ITEM_SUCCESS,
  FETCH_ITEMSET_ITEM_FAILURE,
  UPDATE_ITEMSET_ITEM,
  FETCH_TRANSMOG_ITEM_REQUEST,
  FETCH_TRANSMOG_ITEM_SUCCESS,
  FETCH_TRANSMOG_ITEM_FAILURE,
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

const fetchInfoItem = ({
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
        FETCH_INFO_ITEM_REQUEST,
        FETCH_INFO_ITEM_SUCCESS,
        FETCH_INFO_ITEM_FAILURE,
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
};

const updateItemSetItem = ({
  item,
}) => {
  return {
    type: UPDATE_ITEMSET_ITEM,
    item,
  };
};

const fetchTransmogItem = ({
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
        FETCH_TRANSMOG_ITEM_REQUEST,
        FETCH_TRANSMOG_ITEM_SUCCESS,
        FETCH_TRANSMOG_ITEM_FAILURE,
      ],
      extra: {
        item,
      }
    },
  };
};

const unselectItem = () => {
  return {
    type: UNSELECT_ITEM,
  };
}

export {
  fetchItem,
  fetchInfoItem,
  fetchItemSetItem,
  updateItemSetItem,
  fetchTransmogItem,
  unselectItem,
};
