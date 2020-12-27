import React from "react";
import { Text, StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const OwnText = (props) => (
  <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: hp("1.8%"),
    color: "white",
    paddingBottom: hp("1%")
  },
});

export default OwnText;
