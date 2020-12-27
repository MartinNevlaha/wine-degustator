import React from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

import OwnText from "../UI/Text";
import Colors from "../../constants/Colors";

const TableFormater = (props) => {
  return (
    <View
      style={props.type === "dark" ? styles.darkBackground : styles.formater}
    >
      <View style={styles.headWrapper}>
        <OwnText>{props.headTitle}</OwnText>
      </View>
      <View style={styles.flexWrapper}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexWrapper: {
    flexDirection: "column",
  },
  darkBackground: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  formater: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: wp("1%")
  }
});

export default TableFormater;
