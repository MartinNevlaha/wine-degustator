import * as actionTypes from "./actionTypes";

import axios from "../../axios-instance";

const axiosOptions = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

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
  return (dispatch) => {
    setTimeout(() => {
      dispatch(fetchWineInfoStart());
      axios
        .get(`degustator/wine-list/${wineId}`)
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
  return (dispatch) => {
    dispatch(fetchWineInGroupStart());
    axios
      .get("degustator/wine-list-group")
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
        console.log(err)
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