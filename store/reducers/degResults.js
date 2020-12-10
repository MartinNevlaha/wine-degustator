import * as actionTypes from "../actions/actionTypes";
import { updateObj } from "../../utils/utilities";

const initialState = {
  degName: null,
  results: [],
  loading: false,
  error: null,
  showModal: false,
  detailedResult: null,
};

const degResultsClearError = (state, action) => {
  return updateObj(state, { error: null });
};

const fetchDegResultsStart = (state, action) => {
  return updateObj(state, { loading: true, error: null });
};

const fetchDegResultsSucces = (state, action) => {
  return updateObj(state, {
    loading: false,
    degName: action.degName,
    results: action.results,
  });
};

const fetchDegResultsFail = (state, action) => {
  return updateObj(state, { loading: false, error: action.error });
};

const fetchDegResultByIdStart = (state, action) => {
  return updateObj(state, {
    loading: true,
    error: null,
    showModal: true,
  });
};

const fetchDegResultByIdSucces = (state, action) => {
  return updateObj(state, {
    loading: false,
    detailedResult: action.result,
  });
};

const fetchDegResultByIdFail = (state, action) => {
  return updateObj(state, {
    loading: false,
    error: action.error,
  });
};
const closeDetailResult = (state, action) => {
  return updateObj(state, { showModal: false });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DEG_RESULTS_START:
      return fetchDegResultsStart(state, action);
    case actionTypes.FETCH_DEG_RESULTS_SUCCES:
      return fetchDegResultsSucces(state, action);
    case actionTypes.FETCH_DEG_RESULTS_FAIL:
      return fetchDegResultsFail(state, action);
    case actionTypes.FETCH_DEG_RESULT_BY_ID_START:
      return fetchDegResultByIdStart(state, action);
    case actionTypes.FETCH_DEG_RESULT_BY_ID_SUCCES:
      return fetchDegResultByIdSucces(state, action);
    case actionTypes.FETCH_DEG_RESULT_BY_ID_FAIL:
      return fetchDegResultByIdFail(state, action);
    case actionTypes.CLOSE_DETAIL_RESULT:
      return closeDetailResult(state, action);
    case actionTypes.DEG_RESULTS_CLEAR_ERROR:
      return degResultsClearError(state, action);
    default:
      return state;
  }
};

