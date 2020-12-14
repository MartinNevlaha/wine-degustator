import * as actionTypes from "./actionTypes";

import axios from "../../axios-instance";

const axiosOptions = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const resultsClearError = () => {
  return {
    type: actionTypes.RESULT_CLEAR_ERROR,
  };
};

export const clearResultsSendMessage = () => {
  return {
    type: actionTypes.CLEAR_RESULTS_SEND_MESSAGE,
  };
};

export const fetchWineInfoStart = () => {
  return {
    type: actionTypes.FETCH_WINE_INFO_START,
  };
};

export const fetchWineInfoSucces = (wineInfoData) => {
  return {
    type: actionTypes.FETCH_WINE_INFO_SUCCES,
    data: wineInfoData,
  };
};

export const fetchWineInfoFailled = (error) => {
  return {
    type: actionTypes.FETCH_WINE_INFO_FAIL,
    error: error,
  };
};

export const fetchWineinfo = (wineId) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    setTimeout(() => {
      dispatch(fetchWineInfoStart());
      axios
        .get(`degustator/wine-list/${wineId}`, axiosOptions(token))
        .then((resp) => {
          dispatch(fetchWineInfoSucces(resp.data.wine));
        })
        .catch((err) => {
          if (err.response) {
            const error = {
              message: err.response.data.message,
              code: err.response.status,
            };
            dispatch(fetchWineInfoFailled(error));
          } else {
            dispatch(fetchWineInGroupFailled(err));
            setTimeout(() => {
              dispatch(resultsClearError());
            }, 2500);
          }
        });
    }, 1000);
  };
};

export const fetchWineInGroupStart = () => {
  return {
    type: actionTypes.FETCH_WINE_IN_GROUP_START,
  };
};

export const fetchWineInGroupSuccess = (wineInGroup) => {
  return {
    type: actionTypes.FETCH_WINE_IN_GROUP_SUCCESS,
    wineInGroup,
  };
};

export const fetchWineInGroupFailled = (error) => {
  return {
    type: actionTypes.FETCH_WINE_IN_GROUP_FAIL,
    error,
  };
};

export const fetchWineInGroup = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(fetchWineInGroupStart());
    axios
      .get("degustator/wine-list-group", axiosOptions(token))
      .then((resp) => {
        const wineInGroup = resp.data.wineInGroup;
        const emptyOption = {
          _id: "empty",
          id: "",
        };
        wineInGroup.unshift(emptyOption);
        dispatch(fetchWineInGroupSuccess(wineInGroup));
      })
      .catch((err) => {
        if (err.response) {
          const error = {
            message: err.response.data.message,
            code: err.response.status,
          };
          dispatch(fetchWineInGroupFailled(error));
        }
        dispatch(fetchWineInGroupFailled(err));
        setTimeout(() => {
          dispatch(resultsClearError());
        }, 2500);
      });
  };
};

export const resultsSendInit = () => {
  return {
    type: actionTypes.RESULTS_SEND_INIT
  }
}

export const resultsSendStart = () => {
  return {
    type: actionTypes.RESULTS_SEND_START,
  };
};

export const resultsSendSucces = (id, data, message) => {
  return {
    type: actionTypes.RESULTS_SEND_SUCCESS,
    resultsId: id,
    data,
    message,
  };
};

export const resultsSendFailed = (e) => {
  return {
    type: actionTypes.RESULTS_SEND_FAIL,
    error: e,
  };
};
export const resultsSendCanceled = () => {
  return {
    type: actionTypes.RESULTS_SEND_CANCELED,
  };
};
export const resetResults = () => {
  return {
    type: actionTypes.RESET_RESULTS,
  };
};

export const resultsSend = (data) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(resultsSendStart());
    axios
      .post("degustator/results", data, axiosOptions(token))
      .then((response) => {
        dispatch(
          resultsSendSucces(response.data.name, data, response.data.message)
        );
        dispatch(resetResults());
        setTimeout(() => {
          dispatch(clearResultsSendMessage());
        }, 2500);
      })
      .catch((err) => {
        if (err.response) {
          const error = {
            message: err.response.data.message,
            code: err.response.status,
          };
          dispatch(resultsSendFailed(error));
        }
        dispatch(resultsSendFailed(err));
        setTimeout(() => {
          dispatch(resultsClearError());
        }, 2500);
      });
  };
};
