import React from "react";
import { Text, StyleSheet } from "react-native";

const OwnText = (props) => (
  <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "white",
    paddingBottom: 5
  },
});

export default OwnText;
