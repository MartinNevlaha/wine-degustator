export {
  getEliminatedStatus,
  getDegustatorBtnPress,
  getComment,
  getWineId,
} from "../actions/degustation";

export {
  fetchWineinfo,
  fetchWineInGroup,
  resultsSend,
  resultsSendInit,
  resultsSendCanceled,
} from "../actions/wineInfo";

export {
  fetchDegResults,
  closeDetailResult,
  fetchDegResultById,
} from "../actions/degResults";

export {
  login,
  loginSucces,
  logout,
  setDidTryAutoLogin,
  setAuthTimeout,
} from "../actions/Auth";

export {
  getBaseUrl,
  setBaseUrl,
  resetBaseUrl,
  getPin,
  clearPin,
  pinValid,
  setNewPin,
  getDeviceType
} from "../actions/settings";
