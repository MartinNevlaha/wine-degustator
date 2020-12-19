import * as actionTypes from "./actionTypes";

export const setBaseUrl = (url) => {
  return {
    type: actionTypes.SET_BASE_URL,
    url,
  };
};

export const getBaseUrl = (url) => {
  return {
    type: actionTypes.GET_BASE_URL,
    url,
  };
};

export const resetBaseUrl = () => {
  return {
    type: actionTypes.RESET_BASE_URL,
  };
};

export const getPin = (pin) => {
  return {
    type: actionTypes.GET_PIN,
    pin
  }
}

export const pinValid = () => {
  return {
    type: actionTypes.IS_PIN_VALID
  }
}

export const clearPin = () => {
  return {
    type: actionTypes.CLEAR_PIN
  }
}