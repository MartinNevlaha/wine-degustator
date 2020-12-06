import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const WineInput = (props) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        itemStyle={{
          backgroundColor: "grey",
          color: "blue",
          fontFamily: "open-sans",
          fontSize: 17,
        }}
        style={{ height: 30, width: 80 }}
      >
        <Picker.Item label="" value="" />
        <Picker.Item label="1" value="1" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    elevation: 10,
  },
});

export default WineInput;
