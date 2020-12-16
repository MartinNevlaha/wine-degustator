import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  baseUrl: null,
  isBaseUrlSet: false,
};

const setBaseUrl = (state, action) => {
  return updateObj(state, { baseUrl: action.url, isBaseUrlSet: true });
};

const getBaseUrl = (state, action) => {
  return updateObj(state, {baseUrl: action.url, isBaseUrlSet: true})
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BASE_URL:
      return setBaseUrl(state, action);
    case actionTypes.GET_BASE_URL:
      return getBaseUrl(state, action)
    case actionTypes.RESET_BASE_URL:
      return initialState;
    default:
      return state;
  }
};
