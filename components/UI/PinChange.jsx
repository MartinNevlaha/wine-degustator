import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import OwnText from "./Text";
import Colors from "../../constants/Colors";

const PinChange = (props) => {
  return (
    <View style={styles.changePinContainer}>
      <View style={styles.inputContainer}>
        <OwnText>Zadaj starý PIN aplikácie</OwnText>
        <TextInput
          style={styles.input}
          value=""
          onChangeText={() => {}}
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles.inputContainer}>
        <OwnText>Zadaj nový PIN aplikácie</OwnText>
        <TextInput
          style={styles.input}
          value=""
          onChangeText={() => {}}
          placeholderTextColor="gray"
        />
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.btn}> 
          <Button title="Späť" color={Colors.btnColor} onPress={props.togleModal}/>
        </View>
        <View style={styles.btn}>
          <Button title="Ok" color={Colors.btnColor}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "flex-start",
  },
  input: {
    width: "100%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "white",
  },
  changePinContainer: {
    width: "50%",
    backgroundColor: Colors.primary,
    padding: 20,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: 'space-around',
    margin: 20
  },
  btn: {
    width: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden"
  }
});

export default PinChange;
