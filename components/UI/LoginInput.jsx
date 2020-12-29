import React, { useState, createRef } from "react";
import { View, TextInput, StyleSheet, ScrollView } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import OwnText from "../../components/UI/Text";
import FunctionBtn from "../UI/FunctionBtn";
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

  const passInput = createRef();

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

  const onFocusHandler = () => {
    passInput.current.focus();
  };

  return (
    <ScrollView style={styles.loginContainer}>
      {!isQrScanerShow ? (
        <React.Fragment>
          <View style={styles.inputWrapper}>
            <OwnText style={styles.label}>Prihlasovacie meno</OwnText>
            <TextInput
              style={styles.input}
              value={loginValues.name.value}
              onChangeText={(value) => inputHandler(value, "name")}
              returnKeyType="next"
              onSubmitEditing={onFocusHandler}
            />
          </View>
          <View style={styles.inputWrapper}>
            <OwnText style={styles.label}>Prihlasovacie heslo</OwnText>
            <View style={styles.passContainer}>
              <TextInput
                ref={passInput}
                style={styles.inputPass}
                secureTextEntry={isPassVisible}
                onChangeText={(value) => inputHandler(value, "password")}
                returnKeyType="done"
                onSubmitEditing={submitHandler}
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
          <View style={styles.btnWrapper}>
            <FunctionBtn
              disabled={
                !(
                  loginValues.name.isValid &&
                  loginValues.password.isValid &&
                  props.isBaseUrlSet
                )
              }
              clicked={submitHandler}
            >
              Prihlásiť
            </FunctionBtn>
          </View>
          <View style={styles.qrLoging}>
            <OwnText>Prihlásenie cez QR kód</OwnText>
            <AntDesign
              name="qrcode"
              size={hp("15%")}
              color="white"
              onPress={() => setIsQrScannerShow(true)}
            />
          </View>
        </React.Fragment>
      ) : (
        <View style={styles.qrWrapper}>
          <QrScanner qrScanSubmit={props.submit} scanType="object" />
          <View style={styles.btnWrapper}>
            <FunctionBtn clicked={() => setIsQrScannerShow(false)}>
              Späť
            </FunctionBtn>
          </View>
        </View>
      )}
    </ScrollView>
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
    paddingVertical: hp("0.8%"),
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "white",
  },
  inputPass: {
    width: "90%",
    paddingVertical: hp("0.8%"),
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "white",
  },
  inputWrapper: {
    marginVertical: wp("1%"),
    marginHorizontal: hp("1%"),
  },
  passContainer: {
    flexDirection: "row",
  },
  qrLoging: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("1%"),
  },
  qrWrapper: {
    width: wp("50%"),
    height: hp("50%"),
    alignItems: "center",
  },
  btnWrapper: {
    alignItems: 'center'
  }
});

export default LoginInput;
