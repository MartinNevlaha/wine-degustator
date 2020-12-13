import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  group: null,
  degustatorNumber: null,
  degId: null,
  token: null,
  loading: false,
  isValid: false,
  groupId: null,
  didTryAutoLogin: false,
};

const loginStart = (state, action) => {
  return updateObj(state, { loading: true, error: null });
};

const loginSucces = (state, action) => {
  const isDegValid = action.role === "degustator" && action.role !== null;
  return updateObj(state, {
    loading: false,
    degId: action.degId,
    token: action.token,
    isValid: isDegValid,
    degustatorNumber: action.degNumber,
    group: action.group,
    groupId: action.groupId,
    didTryAutoLogin: true,
  });
};

const loginFailled = (state, action) => {
  return updateObj(state, {
    error: action.error,
    loading: false,
  });
};

const loginClearError = (state, action) => {
  return updateObj(state, { error: null });
};

const logout = (state, action) => {
  return updateObj(state, {
    degId: null,
    token: null,
    isValid: null,
    group: null,
    degustatorNumber: null,
    groupId: null,
    didTryAutoLogin: true,
  });
};

const didTryAutologin = (state, action) => {
  return updateObj(state, { didTryAutoLogin: true });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return loginSucces(state, action);
    case actionTypes.LOGIN_FAIL:
      return loginFailled(state, action);
    case actionTypes.LOGOUT:
      return logout(state, action);
    case actionTypes.LOGIN_CLEAR_ERROR:
      return loginClearError(state, action);
    case actionTypes.SET_DID_TRY_AL:
      return didTryAutologin(state, action);
    default:
      return state;
  }
};
