import axios from "../../axios-instance";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as actionTypes from "./actionTypes";

let timer;

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSucces = (token, degId, role, degNumber, group, groupId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token,
    degId,
    degNumber,
    role,
    group,
    groupId,
  };
};

export const loginFailled = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error,
  };
};

export const setDidTryAutoLogin = () => {
  return {
    type: actionTypes.SET_DID_TRY_AL
  }
}

export const logout = () => {
  clearTimer();
  AsyncStorage.removeItem("degData");
  return {
    type: actionTypes.LOGOUT
  }
}
export const loginClearError = () => {
  return {
      type: actionTypes.LOGIN_CLEAR_ERROR,
  }
}

export const login = (loginData) => {
  return (dispatch) => {
    dispatch(loginStart());
    axios
      .post("degustator/login", loginData)
      .then((res) => {
        const decodedToken = jwt_decode(res.data.token);
        const { degId, role, degNumber, group, groupId } = decodedToken;
        dispatch(
          loginSucces(res.data.token, degId, role, degNumber, group, groupId)
        );
        const expData = decodedToken.exp - decodedToken.iat;
        dispatch(setAuthTimeout(expData));
        dispatch(saveDataToStorage(res.data.token, degId));
      })
      .catch((err) => {
        if (err.response) {
          const error = {
            message: err.response.data.message,
            code: err.response.status,
          };
          dispatch(loginFailled(error));
        } else {
          dispatch(loginFailled(err));
        }
        setTimeout(() => {
          dispatch(loginClearError());
        }, 2500);
      });
  };
};

const saveDataToStorage = (token, degId) => {
  AsyncStorage.setItem(
    "degData",
    JSON.stringify({
      token: token,
      degId: degId,
    })
  );
};

export const setAuthTimeout = (exp) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, exp * 1000);
  };
};

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
