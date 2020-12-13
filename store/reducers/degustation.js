import * as actionTypes from "../actions/actionTypes";
import { updateObj, sumResult } from "../../utils/utilities";

const initialState = {
  wineId: "",
  totalSum: null,
  wineCategory: "",
  eliminated: false,
  comment: "",
  results: {
    lookClarity: null,
    lookOutOfClarity: null,
    smellPurity: null,
    smellPossitiveIntesity: null,
    smellQuality: null,
    tastePurity: null,
    tastePossitiveIntesity: null,
    tasteHarmonicPersistence: null,
    tasteQuality: null,
    generalImpresion: null,
  },
};

const wineId = (state, action) => {
  return updateObj(state, { wineId: action.wineId });
};

const degustatorComment = (state, action) => {
  return updateObj(state, { comment: action.comment });
};

const wineEliminate = (state, action) => {
  return updateObj(state, { eliminated: action.status });
};

const degustatorPressBtn = (state, action, sum, wineCategory) => {
  let updateResults = updateObj(state.results, {
    [action.btnType]: action.value,
  });
  let updateState = updateObj(state, {
    wineCategory: wineCategory,
    totalSum: sum,
    results: updateResults,
  });
  return updateObj(state, updateState);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEGUSTATOR_PRESS_BTN:
      const [sum, wineCategory] = sumResult(
        state.results,
        action.value,
        action.btnType
      );
      return degustatorPressBtn(state, action, sum, wineCategory);
    case actionTypes.WINE_ELIMINATE:
      return wineEliminate(state, action);
    case actionTypes.WINE_ID:
      return wineId(state, action);
    case actionTypes.DEGUSTATOR_COMMENT:
      return degustatorComment(state, action);
    case actionTypes.RESET_RESULTS:
      return initialState;
    default:
      return state;
  }
};
