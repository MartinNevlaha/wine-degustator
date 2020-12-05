import React from "react";
import { View, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import Colors from "../../constants/Colors";
import OwnText from "../UI/Text";

const ContinuosResults = (props) => {
  return (
    <View style={styles.container}>
      <OwnText style={styles.title}>Priebežný výsledok</OwnText>
      <OwnText>Skupina: {props.degInfo.group}</OwnText>
      <OwnText>Číslo degustátora: {props.degInfo.degustatorNumber}</OwnText>
      <View style={styles.checkboxContainer}>
        <OwnText style={{padding: 10}}>Eliminovať víno</OwnText>
        <CheckBox
          tintColors={props.eliminated ? 'red': 'white'}
          disabled={false}
          value={props.eliminated}
          onValueChange={ (newValue) => props.eliminatedHandler(newValue)}
        />
      </View>
      <OwnText>
        Kategória vína: {props.eliminated ? "Eliminované" : props.wineCategory}
      </OwnText>
      <OwnText>
        Celkom bodov: {props.eliminated ? "Eliminované" : props.totalSum}
      </OwnText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "25%",
    height: "100%",
    backgroundColor: Colors.primary,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export default ContinuosResults;
