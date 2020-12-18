import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import Colors from "../../constants/Colors";
import OnwText from "./Text";

const PINCode = () => {
  const initialState = {
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  };
  const tabHeight = useBottomTabBarHeight();
  const [PIN, setPIN] = useState(initialState);

  const inputHandler = (value, inputType) => {
    
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "" : "position"}
      enabled
      keyboardVerticalOffset={tabHeight + 10}
    >
      <OnwText style={styles.title}>Zadaj PIN</OnwText>
      <View style={styles.pinContainer}>
        <TextInput
          style={styles.pinNumber}
          maxLength={1}
          keyboardType="number-pad"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.pinNumber}
          maxLength={1}
          keyboardType="number-pad"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.pinNumber}
          maxLength={1}
          keyboardType="number-pad"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.pinNumber}
          maxLength={1}
          keyboardType="number-pad"
          secureTextEntry={true}
        />
      </View>
      <Button title="Ok" color={Colors.btnColor} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparentGrey,
    padding: 20,
    alignItems: "center",
  },
  pinContainer: {
    flexDirection: "row",
  },
  pinNumber: {
    margin: 10,
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: "open-sans-bold",
  },
});

export default PINCode;
