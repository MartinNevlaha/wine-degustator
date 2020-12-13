import axios from "../../axios-instance";

import * as actionTypes from "./actionTypes";

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};

export const loginSucces = (token, degId, degNumber, role, group, groupId) => {
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

export const login = loginData => {
  return dispatch => {
    dispatch(loginStart());
    axios.post("degustator/login", loginData)
    .then(resp => console.log(resp))
    .catch(err => {
      console.log(err)
      if (err.response) {
        const error = {
            message: err.response.data.message,
            code: err.response.status
        }
        dispatch(degLoginFailled(error));
    } else {
        dispatch(degLoginFailled(err))
    }
    setTimeout(() => {
        dispatch(degLoginClearError())
    }, 2500)
    })
  }
}
