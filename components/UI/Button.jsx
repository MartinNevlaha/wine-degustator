import React from "react";
import { View, Button, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const OwnButton = (props) => {
  return (
    <View style={styles.btnWrapper}>
      <Button
        disabled={props.disabled}
        title={props.title.toString()}
        onPress={() => props.btnPress(props.title, props.btnType, props.index)}
        color={!props.isActive ? Colors.btnColor : Colors.btnActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    width: 100,
    height: 30,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    marginHorizontal: 15,
    marginVertical: 8,
  },
});

export default React.memo(OwnButton, (props, nextProps) => {
  if (props.disabled === nextProps.disabled && props.isActive === nextProps.isActive ) {
    return true;
  }
});
