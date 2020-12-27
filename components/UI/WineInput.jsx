import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const WineInput = (props) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        itemStyle={{
          backgroundColor: "grey",
          color: "blue",
          fontFamily: "open-sans",
          fontSize: hp("1%"),
        }}
        style={{ height: hp("3%"), width: wp("8%") }}
        onValueChange={props.getWineId}
        selectedValue={props.selectedId}
      >
        {props.idOptions.map((item, i) => (
          <Picker.Item key={i} label={`${item.id}`} value={`${item._id}`} />
        ))}
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
