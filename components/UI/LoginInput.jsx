import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import OwnText from "../../components/UI/Text";
import Colors from "../../constants/Colors";
import QrScanner from "./QrScanner";
import { isInputNameValid, isInputPassValid } from "../../utils/validation";

const LoginInput = (props) => {
  const [isPassVisible, setIsPassVisible] = useState(true);
  const [isQrScanerShow, setIsQrScannerShow] = useState(false);
  const [loginValues, setLoginValues] = useState({
    name: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  const visibilityTogleHandler = () => {
    setIsPassVisible((prevState) => !prevState);
  };

  const validationInput = (key, value) => {
    if (key === "name") {
      return isInputNameValid(value);
    } else {
      return isInputPassValid(value);
    }
  };

  const inputHandler = (value, inputType) => {
    setLoginValues({
      ...loginValues,
      [inputType]: {
        ...loginValues[inputType],
        value: value,
        isValid: validationInput(inputType, value),
      },
    });
  };
  const submitHandler = () => {
    const loginData = {
      name: loginValues.name.value,
      password: loginValues.password.value,
    };
    props.submit(loginData);
  };

  return (
    <View style={styles.loginContainer}>
      {!isQrScanerShow ? (
        <React.Fragment>
          <View style={styles.inputWrapper}>
            <OwnText style={styles.label}>Prihlasovacie meno</OwnText>
            <TextInput
              style={styles.input}
              value={loginValues.name.value}
              onChangeText={(value) => inputHandler(value, "name")}
            />
          </View>
          <View style={styles.inputWrapper}>
            <OwnText style={styles.label}>Prihlasovacie heslo</OwnText>
            <View style={styles.passContainer}>
              <TextInput
                style={styles.inputPass}
                secureTextEntry={isPassVisible}
                onChangeText={(value) => inputHandler(value, "password")}
              />
              <Feather
                name={isPassVisible ? "eye" : "eye-off"}
                size={20}
                color="white"
                style={{ width: "10%", textAlign: "center" }}
                onPress={visibilityTogleHandler}
              />
            </View>
          </View>
          <View style={styles.btn}>
            <Button
              title="Prihlásiť"
              color={Colors.btnColor}
              disabled={
                !(loginValues.name.isValid && loginValues.password.isValid)
              }
              onPress={submitHandler}
            />
          </View>
          <View style={styles.qrLoging}>
            <OwnText>Prihlásenie cez QR kód</OwnText>
            <AntDesign
              name="qrcode"
              size={80}
              color="white"
              onPress={() => setIsQrScannerShow(true)}
            />
          </View>
        </React.Fragment>
      ) : (
        <View style={styles.qrWrapper}>
          <QrScanner qrScanSubmit={props.submit} />
          <View style={styles.btn}>
            <Button
              title="Klasické prihlásenie"
              color={Colors.btnColor}
              onPress={() => setIsQrScannerShow(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    width: "80%",
  },
  label: {
    fontFamily: "open-sans-bold",
  },
  input: {
    width: "100%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "white",
  },
  inputPass: {
    width: "90%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "white",
  },
  inputWrapper: {
    margin: 10,
  },
  btn: {
    margin: 15,
    overflow: "hidden",
    borderRadius: 10,
  },
  passContainer: {
    flexDirection: "row",
  },
  qrLoging: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  qrWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});

export default LoginInput;
