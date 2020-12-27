import React from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    marginBottom: hp("3%")
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: hp("3%"),
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("1%"),
  },
  infoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("1%"),
  },
});

export default DegustatorInfo;
