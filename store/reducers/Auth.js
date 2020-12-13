import * as actionTypes from '../actions/actionTypes';
import { updateObj } from '../../utils/utilities';

const initialState = {
  group: null,
  degustatorNumber: null,
  degId: null,
  token: null,
  loading: false,
  isValid: false,
  groupId: null
}


const loginStart = (state, action) => {
  return updateObj(state, { loading: true, error: null })
}

const loginSucces = (state, action) => {
  const isDegValid = action.role === 'degustator' && action.role !== null;
  return updateObj(state, {
      loading: false,
      degId: action.degId,
      token: action.token,
      isValid: isDegValid,
      degustatorNumber: action.degNumber,
      group: action.group,
      groupId: action.groupId
  })
}

const loginFailled = (state, action) => {
  return updateObj(state, {
      error: action.error,
      loading: false
  })
}

const loginClearError = (state, action) => {
  return updateObj(state, {error: null})
}

const logout = (state, action) => {
  return updateObj(state, {
      degId: null,
      token: null,
      isValid: null,
      group: null,
      degustatorNumber: null,
      groupId: null
  })
}

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
        return loginClearError(state, action)
    default:
        return state;
}
}