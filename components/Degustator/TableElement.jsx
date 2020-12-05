import React from "react";
import { View, StyleSheet } from "react-native";

import OwnText from "../UI/Text";

const TableElement = (props) => {
  return (
    <View style={styles.classWrapper}>
      <OwnText>{props.title}</OwnText>
      <View style={styles.btnContainer}>{props.btnType}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
  },
  classWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default TableElement;
