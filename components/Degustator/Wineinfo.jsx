import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";

import OwnText from "../UI/Text";

const WineInfo = (props) => {
  return (
    <View style={styles.container}>
      {!props.loading ?
      <React.Fragment>
      <OwnText>
        Súťažná kat.:
        {props.wineInfo.competitiveCategory
          ? props.wineInfo.competitiveCategory
          : "Zadaj číslo vína"}
      </OwnText>
      <OwnText>
        Farba:
        {props.wineInfo.color ? props.wineInfo.color : "Zadaj číslo vína"}
      </OwnText>
      <OwnText>
        Charakter:
        {props.wineInfo.character
          ? props.wineInfo.character
          : "Zadaj číslo vína"}
      </OwnText>
      <OwnText>
        Ročník:
        {props.wineInfo.vintage ? props.wineInfo.vintage : "Zadaj číslo vína"}
      </OwnText>
      </React.Fragment> :
      <ActivityIndicator  size="small" color="white" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: "18%",
    minHeight: "16%"
  }
});

const mapStateToProps = (state) => ({
  wineInfo: state.wineInfo.wineInfo,
  loading: state.wineInfo.loading
});



export default connect(mapStateToProps, null)(WineInfo);
