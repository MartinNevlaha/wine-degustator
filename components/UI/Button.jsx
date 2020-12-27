import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../../constants/Colors";
import OwnText from "./Text";

const OwnButton = (props) => {
  let btnStyle = styles.btnWrapper
  if (props.isActive && !props.disabled) {
    btnStyle = styles.btnWrapperActive
  } else if (props.disabled) {
    btnStyle = styles.btnWrapperDisabled
  }
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={() => props.btnPress(props.title, props.btnType, props.index)}
      style={btnStyle}
    >
      <OwnText>{props.title.toString()}</OwnText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    width: wp("6.8%"),
    height: hp("3.9%"),
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
  btnWrapperActive: {
    width: wp("6.8%"),
    height: hp("3.9%"),
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp("1.5%"),
    marginVertical: hp("1%"),
    backgroundColor: Colors.btnActive,
  },
  btnWrapperDisabled: {
    width: wp("6.8%"),
    height: hp("3.9%"),
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

export default React.memo(OwnButton, (props, nextProps) => {
  if (
    props.disabled === nextProps.disabled &&
    props.isActive === nextProps.isActive
  ) {
    return true;
  }
});
