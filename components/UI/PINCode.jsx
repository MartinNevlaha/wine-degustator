import React, { useState, useEffect, createRef } from "react";
import {
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Vibration,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { useDispatch, useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../../constants/Colors";
import OnwText from "./Text";
import FunctionBtn from "./FunctionBtn";
import { getPinCode } from "../../utils/pinCode";
import * as action from "../../store/actions/index";

const PINCode = (props) => {
  const tabHeight = useBottomTabBarHeight();
  const [PIN, setPIN] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const pinInput = createRef();
  const dispatch = useDispatch();
  const storedPin = useSelector((state) => state.settings.pin);

  useEffect(() => {
    const getPinAsync = async () => {
      const Pin = await getPinCode();
      if (!Pin) {
        return;
      }
      console.log(Pin)
      dispatch(action.getPin(Pin));
    };
    getPinAsync();
  }, [dispatch, getPinCode]);

  const _checkCode = async (code) => {
    if (code !== storedPin) {
      pinInput.current.shake().then(() => setPIN(""));
      Vibration.vibrate(1000);
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  };

  const inputHandler = async (value) => {
    if (value.length !== 4) {
      setBtnDisabled(true);
    }
    setPIN(value);
  };
  const submitHandler = () => {
    dispatch(action.pinValid());
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "android" ? "" : "position"}
      enabled
      keyboardVerticalOffset={tabHeight + 10}
    >
      <OnwText style={styles.title}>Zadaj PIN kód aplikácie</OnwText>
      <View style={styles.pinContainer}></View>
      <SmoothPinCodeInput
        autoFocus={true}
        ref={pinInput}
        password
        mask="﹡"
        value={PIN}
        onTextChange={(code) => inputHandler(code)}
        onFulfill={_checkCode}
        cellStyle={{
          borderBottomWidth: 2,
          borderColor: "white",
        }}
        cellStyleFocused={{
          borderColor: "grey",
        }}
        textStyle={{
          fontFamily: "open-sans",
          fontSize: 24,
          color: "white",
        }}
      />
      <View style={styles.btnWrapper}>
        <FunctionBtn disabled={btnDisabled} clicked={submitHandler}>
          Ok
        </FunctionBtn>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparentGrey,
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("2%"),
    alignItems: "center",
    borderRadius: 10,
  },
  pinContainer: {
    flexDirection: "row",
  },
  pinNumber: {
    marginVertical: wp("1%"),
    marginHorizontal: hp("1%"),
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: "open-sans-bold",
  },
  btnWrapper: {
    alignItems: 'center',
    marginVertical: hp("2%")
  }
});

export default PINCode;
