import React, { useState, useEffect, useCallback } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import DegTable from "../components/Degustator/DegTable";
import ContinuosResults from "../components/Degustator/ContinuousResults";
import * as action from "../store/actions/index";
import { isIdValid, isRatingValid } from "../utils/validation";
import Toast from "../components/UI/Toast";
import OwnModal from "../components/HOC/Modal";
import ResumeResults from "../components/Degustator/ResumeResults";
import HeaderButton from "../components/UI/HeaderButton";

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

  const loadWinInGroups = useCallback(() => {
    onFetchWineInGroups();
  }, [onFetchWineInGroups]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadWinInGroups);
    return () => {
      unsubscribe();
    };
  }, [loadWinInGroups]);

  useEffect(() => {
    loadWinInGroups();
  }, [loadWinInGroups]);

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
    setIsWineIdValid(isIdValid(selectedId[0].id));
    props.onGetWineId(selectedId[0].id);
    if (value !== "empty") {
      props.onFetchWineInfo(selectedId[0].id);
    }
  };

  const sendResultsHandler = () => {
    let data = {};
    if (props.results.eliminated) {
      data = {
        comNumber: "",
        degNumber: "",
        wineId: props.results.wineId,
        eliminated: props.results.eliminated,
        comment: props.results.comment,
      };
    } else {
      data = {
        comNumber: "",
        degNumber: "",
        wineId: props.results.wineId,
        eliminated: props.results.eliminated,
        wineCategory: props.results.wineCategory,
        totalSum: props.results.totalSum,
        comment: props.results.comment,
        results: props.results.results,
      };
    }
    props.onSendResults(data);
  };

  let message = "";
  if (props.error) {
    message = props.error.message;
  } else if (props.isSucces) {
    message = props.successMessage;
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/wine_background.jpg")}
        style={styles.background}
      >
        <OwnModal isVisible={props.sending}>
          <ResumeResults
            loading={props.loading}
            cancel={props.onResultSendCanceled}
            submit={sendResultsHandler}
            sendData={props.results}
          />
        </OwnModal>
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
            degInfo={props.degInfo}
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
            toggleModal={props.onResulsSendInit}
          />
        </View>
        <Toast visible={props.error || props.isSucces} message={message} />
      </ImageBackground>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Degustácia",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="md-menu"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
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
    degInfo: state.auth,
    results: state.degReducer,
    eliminated: state.degReducer.eliminated,
    wineCategory: state.degReducer.wineCategory,
    totalSum: state.degReducer.totalSum,
    comment: state.degReducer.comment,
    idOptions: state.wineInfo.wineInGroups || [],
    error: state.wineInfo.error,
    isSucces: state.wineInfo.isSucces,
    successMessage: state.wineInfo.message,
    sending: state.wineInfo.sending,
    loading: state.wineInfo.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDegustatorPressBtn: (btnType, value) =>
      dispatch(action.getDegustatorBtnPress(btnType, value)),
    onEliminated: (isEliminated) =>
      dispatch(action.getEliminatedStatus(isEliminated)),
    onGetComment: (text) => dispatch(action.getComment(text)),
    onFetchWineInGroups: () => dispatch(action.fetchWineInGroup()),
    onFetchWineInfo: (wineId) => dispatch(action.fetchWineinfo(wineId)),
    onSendResults: (data) => dispatch(action.resultsSend(data)),
    onGetWineId: (id) => dispatch(action.getWineId(id)),
    onResulsSendInit: () => dispatch(action.resultsSendInit()),
    onResultSendCanceled: () => dispatch(action.resultsSendCanceled()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DegustatorScreen);
