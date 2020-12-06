import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { connect } from "react-redux";

import DegTable from "../components/Degustator/DegTable";
import ContinuosResults from "../components/Degustator/ContinuousResults";
import * as action from "../store/actions/index";
import { isIdValid, isRatingValid } from "../utils/validation";

const DegustatorScreen = (props) => {
  const initialStyleState = {
    lookClarity: [false, false, false, false, false],
    lookOutOfClarity: [false, false, false, false, false],
    smellPurity: [false, false, false, false, false],
    smellPossitiveIntesity: [false, false, false, false, false],
    smellQuality: [false, false, false, false, false],
    tastePurity: [false, false, false, false, false],
    tastePossitiveIntesity: [false, false, false, false, false],
    tasteHarmonicPersistence: [false, false, false, false, false],
    tasteQuality: [false, false, false, false, false],
    generalImpresion: [false, false, false, false, false],
  };
  const [isActive, setIsActive] = useState(initialStyleState);
  const [selectedWineId, setSelectedWineId] = useState();
  const [isWineIdValid, setIsWineIdValid] = useState(false);

  const { onFetchWineInGroups } = props;
  useEffect(() => {
    onFetchWineInGroups();
  }, [onFetchWineInGroups]);

  const btnPressHandler = (value, btnType, index) => {
    props.onDegustatorPressBtn(btnType, +value);
    setIsActive((prevState) => ({
      ...prevState,
      [btnType]: prevState[btnType].map((state, i) => {
        return i === index;
      }),
    }));
  };

  const eliminatedHandler = (value) => {
    props.onEliminated(value);
  };

  const getWineIdHandler = (value) => {
    const selectedId = props.idOptions.filter((item) => item._id === value);
    setSelectedWineId(value);
    setIsWineIdValid(isIdValid(selectedId[0].id))
    if (value !== 'empty') {
      props.onFetchWineInfo(selectedId[0].id);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/wine_background.jpg")}
        style={styles.background}
      >
        <View style={styles.componetContainer}>
          <DegTable
            btnPress={btnPressHandler}
            isActive={isActive}
            eliminated={props.eliminated}
            idOptions={props.idOptions}
            selectedId={selectedWineId}
            getWineId={getWineIdHandler}
          />
          <ContinuosResults
            degInfo
            totalSum={props.totalSum}
            wineCategory={props.wineCategory}
            eliminated={props.eliminated}
            eliminatedHandler={eliminatedHandler}
            getComment={props.onGetComment}
            comment={props.comment}
            isRatingValid={isRatingValid(
              props.results.results,
              props.eliminated
            )}
            isWineIdValid={isWineIdValid}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  componetContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const mapStateToProps = (state) => {
  return {
    results: state.degReducer,
    eliminated: state.degReducer.eliminated,
    wineCategory: state.degReducer.wineCategory,
    totalSum: state.degReducer.totalSum,
    comment: state.degReducer.comment,
    idOptions: state.wineInfo.wineInGroups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDegustatorPressBtn: (btnType, value) => dispatch(action.getDegustatorBtnPress(btnType, value)),
    onEliminated: (isEliminated) => dispatch(action.getEliminatedStatus(isEliminated)),
    onGetComment: (text) => dispatch(action.getComment(text)),
    onFetchWineInGroups: () => dispatch(action.fetchWineInGroup()),
    onFetchWineInfo: (wineId) => dispatch(action.fetchWineinfo(wineId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DegustatorScreen);
