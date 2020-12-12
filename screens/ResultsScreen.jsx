import React, { useEffect, useCallback } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";

import HeaderButton from "../components/UI/HeaderButton";
import DegustatorInfo from "../components/Degustator/DegustatorInfo";
import ResultsTable from "../components/Degustator/ResultsTable";
import OwnModal from "../components/HOC/Modal";
import ResumeResults from "../components/Degustator/ResumeResults";
import * as action from "../store/actions/index";

const ResultsScreen = (props) => {
  const { onFetchDegResults } = props;

  const loadDegResults = useCallback(() => {
    onFetchDegResults();
  }, [onFetchDegResults]);

  useEffect(() => {
    const unsubsribe = props.navigation.addListener("focus", loadDegResults);

    return () => {
      unsubsribe();
    };
  }, [loadDegResults]);

  useEffect(() => {
    loadDegResults();
  }, [loadDegResults]);

  const onClickHandler = (_id) => {
    console.log(_id);
    props.onFetchDegResultsById(_id);
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/wine_background.jpg")}
        style={styles.background}
      >
        <OwnModal isVisible={props.degResults.showModal}>
          <ResumeResults
            loading={props.degResults.loading}
            type="degResults"
            sendData={props.detailedResult}
            submit={props.onCloseDetailResults}
          />
        </OwnModal>
        <DegustatorInfo
          degName={props.degResults.degName}
          degustatorNumber="1" //doplnit
          degGroup="A" //doplnit
        />
        <ResultsTable
          results={props.degResults.results}
          clicked={onClickHandler}
        />
      </ImageBackground>
    </View>
  );
};
export const screenOptions = (navData) => {
  return {
    headerTitle: "Vaše výsledky",
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
    alignItems: "center",
  },
});

const mapStateToProps = (state) => ({
  degResults: state.degResults,
  detailedResult: state.degResults.detailedResult,
  error: state.degResults.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDegResults: () => dispatch(action.fetchDegResults()),
    onFetchDegResultsById: (_id) => dispatch(action.fetchDegResultById(_id)),
    onCloseDetailResults: () => dispatch(action.closeDetailResult()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsScreen);
