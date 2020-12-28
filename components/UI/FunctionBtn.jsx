import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../../constants/Colors";
import OwnText from "../../components/UI/Text";

const FunctionBtn = props => {
  let btnStyle = styles.btnWrapperDisabled;
  if (!props.disabled) {
    btnStyle = styles.btnWrapper
  }
  return (
    <TouchableOpacity 
    disabled={props.disabled}
    style={btnStyle}
    onPress={props.clicked}>
      <OwnText>{props.children}</OwnText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnWrapper: {
    width: wp("15%"),
    height: hp("5%"),
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp("1.5%"),
    marginVertical: hp("1%"),
    backgroundColor: Colors.btnColor,
  },
  btnWrapperDisabled: {
    width: wp("15%"),
    height: hp("5%"),
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp("1.5%"),
    marginVertical: hp("1%"),
    backgroundColor: "gray",
  },
});

export default FunctionBtn;