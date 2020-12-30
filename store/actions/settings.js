import * as actionTypes from "./actionTypes";
import { setNewPinCode } from "../../utils/pinCode";
import * as Device from "expo-device";

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
    pin,
  };
};

export const pinValid = () => {
  return {
    type: actionTypes.IS_PIN_VALID,
  };
};

export const clearPin = () => {
  return {
    type: actionTypes.CLEAR_PIN,
  };
};

export const setNewPinSucces = (newPin) => {
  return {
    type: actionTypes.SET_NEW_PIN_SUCCESS,
    newPin,
  };
};

export const setNewPinFail = (error) => {
  return {
    type: actionTypes.SET_NEW_PIN_ERROR,
    error,
  };
};

export const setNewPin = (newPin) => {
  return (dispatch) => {
    setNewPinCode(newPin)
      .then((res) => {
        dispatch(setNewPinSucces(res));
      })
      .catch((err) => dispatch(setNewPinFail(err)));
  };
};

export const getDeviceTypeSucces = (devType) => {
  return {
    type: actionTypes.GET_DEVICE_TYPE_SUCCESS,
    devType,
  };
};

export const getDeviceTypeFail = () => {
  return {
    type: actionTypes.GET_DEVICE_TYPE_FAIL,
  };
};

export const getDeviceType = () => {
  return (dispatch) => {
    Device.getDeviceTypeAsync()
      .then((res) => {
        dispatch(getDeviceTypeSucces(res));
      })
      .catch((err) => dispatch(getDeviceTypeFail()));
  };
};
