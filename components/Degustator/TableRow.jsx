import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

import OwnText from "../UI/Text";

const TableRow = (props) => {
  return (
    <TouchableOpacity style={styles.row} onPress={() => props.clicked(props._id)}>
      <View style={styles.cell}>
        <OwnText>{props.wineId}</OwnText>
      </View>
      <View style={styles.cell}>
        <OwnText>{props.color}</OwnText>
      </View>
      <View style={styles.cell}>
        <OwnText>{props.character}</OwnText>
      </View>
      <View style={styles.cell}>
        <OwnText>{props.eliminated}</OwnText>
      </View>
      <View style={styles.cell}>
        <OwnText>{props.wineCategory}</OwnText>
      </View>
      <View style={styles.cell}>
        <OwnText>{props.totalSum}</OwnText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: 'space-evenly',
    padding: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1
    },
  cell: {
    width: "14%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TableRow;
