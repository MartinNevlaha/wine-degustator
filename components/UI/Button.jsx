import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

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
    width: 70,
    height: 28,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: Colors.btnColor,
  },
  btnWrapperActive: {
    width: 70,
    height: 28,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: Colors.btnActive,
  },
  btnWrapperDisabled: {
    width: 70,
    height: 28,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 8,
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
