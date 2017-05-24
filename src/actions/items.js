import {
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_SUCCESS,
  FETCH_ITEM_FAILURE,
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

export {
  fetchItem,
};
