import * as actionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setBaseUrl = (url) =>  {
  AsyncStorage.setItem("baseUrl", url)
  return {
    type: actionTypes.SET_BASE_URL,
    url
  }
}

export const getBaseUrl = (url) => {
  return {
    type: actionTypes.GET_BASE_URL,
    url
  }
}

export const resetBaseUrl = () => {
  return {
    type: actionTypes.RESET_BASE_URL
  }
}