import React from "react";
import { View, StyleSheet } from "react-native";

import OwnText from "../../components/UI/Text";
import Colors from "../../constants/Colors";

const DegustatorInfo = (props) => {
  return (
    <View style={styles.container}>
      <OwnText style={styles.title}>Degustátor info</OwnText>
      <View style={styles.infoContainer}>
        <OwnText>Meno degustátora: {props.degName}</OwnText>
        <OwnText>Číslo degustátora: {props.degustatorNumber}</OwnText>
        <OwnText>Degustačná skupina: {props.degGroup}</OwnText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "60%",
    height: "15%",
    backgroundColor: Colors.primary,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    padding: 10
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
});

export default DegustatorInfo;
