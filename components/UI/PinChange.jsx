import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import OwnText from "./Text";
import Colors from "../../constants/Colors";
import * as action from "../../store/actions/index";

const PinChange = (props) => {
  const initialStateOld = {
    value: "",
    isValid: false,
    isTouch: false,
  };
  const initialStateNew = {
    value: "",
    isTouch: false,
  };
  const [oldPinValid, setOldPinValid] = useState(initialStateOld);
  const [newPinValid, setNewPinValid] = useState(initialStateNew);

  const dispatch = useDispatch();

  const PIN = useSelector((state) => state.settings.pin);

  const pinValidator = (value, oldPin) => {
    if (value.length === 4 && value === oldPin) {
      return true;
    } else if (value.length === 4) {
      return false;
    }
  };
  const oldPinInputHandler = (value) => {
    setOldPinValid({
      value: value,
      isValid: pinValidator(value, PIN),
      isTouch: value.length === 4 ? true : false,
    });
  };

  const newPinInputHandler = (value) => {
    setNewPinValid({
      value: value,
      isTouch: value.length === 4 ? true : false,
    });
  };

  const setNewPinHandler = () => {
    dispatch(action.setNewPin(newPinValid.value));
    props.togleModal();
  };

  return (
    <View style={styles.changePinContainer}>
      <View style={styles.inputContainer}>
        <OwnText>Zadaj starý PIN aplikácie</OwnText>
        <TextInput
          style={styles.input}
          value={oldPinValid.value}
          onChangeText={oldPinInputHandler}
          placeholderTextColor="gray"
          keyboardType="number-pad"
          maxLength={4}
          returnKeyType="next"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.warnInfo}>
        {!oldPinValid.isValid && oldPinValid.isTouch ? (
          <React.Fragment>
            <AntDesign name="warning" size={24} color="red" />
            <OwnText style={{ padding: 10, color: "red" }}>
              Zadaný PIN kód sa nezhoduje
            </OwnText>
          </React.Fragment>
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        <OwnText>Zadaj nový PIN aplikácie</OwnText>
        <TextInput
          style={styles.input}
          value={newPinValid.value}
          onChangeText={newPinInputHandler}
          placeholderTextColor="gray"
          maxLength={4}
          returnKeyType="done"
          secureTextEntry={true}
          editable={oldPinValid.isValid}
        />
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <Button
            title="Späť"
            color={Colors.btnColor}
            onPress={props.togleModal}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title="Ok"
            color={Colors.btnColor}
            disabled={!(oldPinValid.isValid && newPinValid.isTouch)}
            onPress={setNewPinHandler}
          />
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
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("0.8%"),
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "white",
  },
  changePinContainer: {
    width: "50%",
    backgroundColor: Colors.primary,
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("2%"),
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: wp("2%"),
    marginHorizontal: hp("2%"),
  },
  btn: {
    width: wp("10%"),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
  },
  warnInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("1%"),
  },
});

export default PinChange;
