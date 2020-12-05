import React, { useState } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { connect } from "react-redux";

import DegTable from "../components/Degustator/DegTable";
import ContinuosResults from "../components/Degustator/ContinuousResults";
import * as action from "../store/actions/index";

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
          />
          <ContinuosResults
            degInfo
            totalSum={props.totalSum}
            wineCategory={props.wineCategory}
            eliminated={props.eliminated}
            eliminatedHandler={eliminatedHandler}
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
    totalSum: state.degReducer.totalSum
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDegustatorPressBtn: (btnType, value) =>
      dispatch(action.getDegustatorBtnPress(btnType, value)),
    onEliminated: (isEliminated) =>
      dispatch(action.getEliminatedStatus(isEliminated)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DegustatorScreen);
