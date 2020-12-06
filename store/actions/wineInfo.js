import * as actionTypes from './actionTypes';

import axios from '../../axios-instance';

export const fetchWineInfoStart = () => {
  return {
    type: actionTypes.FETCH_WINE_INFO_START
  }
};