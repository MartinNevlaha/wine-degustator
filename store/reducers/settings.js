import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  baseUrl: null,
  isBaseUrlSet: false,
  pin: null,
  pinValid: false,
};

const setBaseUrl = (state, action) => {
  return updateObj(state, { baseUrl: action.url, isBaseUrlSet: true });
};

const getBaseUrl = (state, action) => {
  return updateObj(state, { baseUrl: action.url, isBaseUrlSet: true });
};

const resetBaseUrl = (state, action) => {
  return updateObj(state, { baseUrl: null, isBaseUrlSet: false })
}

const getPin = (state, action) => {
  return updateObj(state, { pin: action.pin });
};

const pinValid = (state, action) => {
  return updateObj(state, { pinValid: true });
};

const clearPin = (state, action) => {
  return updateObj(state, { pin: null, pinValid: false });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BASE_URL:
      return setBaseUrl(state, action);
    case actionTypes.GET_BASE_URL:
      return getBaseUrl(state, action);
    case actionTypes.RESET_BASE_URL:
      return resetBaseUrl(state, action);
    case actionTypes.GET_PIN:
      return getPin(state, action);
    case actionTypes.CLEAR_PIN:
      return clearPin(state, action);
    case actionTypes.IS_PIN_VALID:
      return pinValid(state, action);
    default:
      return state;
  }
};
