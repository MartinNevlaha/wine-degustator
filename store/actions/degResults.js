import * as actionTypes from "./actionTypes";
import axios from "axios";

const axiosOptions = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const degResultsClearError = () => {
  return {
    type: actionTypes.DEG_RESULTS_CLEAR_ERROR,
  };
};

export const fetchDegResultsStart = () => {
  return {
    type: actionTypes.FETCH_DEG_RESULTS_START,
  };
};

export const fetchDegResultsSucces = (degName, results) => {
  return {
    type: actionTypes.FETCH_DEG_RESULTS_SUCCES,
    degName: degName,
    results: results,
  };
};

export const fetchDegResultsFailled = (error) => {
  return {
    type: actionTypes.FETCH_DEG_RESULTS_FAIL,
    error: error,
  };
};

export const fetchDegResults = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const baseUrl = getState().settings.baseUrl;
    dispatch(fetchDegResultsStart());
    axios
      .get(baseUrl + "/degustator/results", axiosOptions(token))
      .then((resp) => {
        dispatch(fetchDegResultsSucces(resp.data.degName, resp.data.results));
      })
      .catch((err) => {
        if (err.response) {
          const error = {
            message: err.response.data.message,
            code: err.response.status,
          };
          dispatch(fetchDegResultsFailled(error));
        }
        dispatch(fetchDegResultsFailled(err));
        setTimeout(() => {
          dispatch(degResultsClearError());
        }, 2500);
      });
  };
};

export const fetchDegResultByIdStart = () => {
  return {
    type: actionTypes.FETCH_DEG_RESULT_BY_ID_START,
  };
};

export const fetchDegResultByIdSucces = (result) => {
  return {
    type: actionTypes.FETCH_DEG_RESULT_BY_ID_SUCCES,
    result: result,
  };
};

export const fetchDegResultByIdFail = (error) => {
  return {
    type: actionTypes.FETCH_DEG_RESULT_BY_ID_FAIL,
    error: error,
  };
};

export const fetchDegResultById = (_id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    const baseUrl = getState().settings.baseUrl;
    dispatch(fetchDegResultByIdStart());
    axios
      .get(baseUrl + `/degustator/result/${_id}`, axiosOptions(token))
      .then((resp) => {
        dispatch(fetchDegResultByIdSucces(resp.data));
      })
      .catch((err) => {
        if (err.response) {
          const error = {
            message: err.response.data.message,
            code: err.response.status,
          };
          dispatch(fetchDegResultByIdFail(error));
        }
        dispatch(fetchDegResultByIdFail(err));
        setTimeout(() => {
          dispatch(degResultsClearError());
        }, 2500);
      });
  };
};

export const closeDetailResult = () => {
  return {
    type: actionTypes.CLOSE_DETAIL_RESULT,
  };
};
