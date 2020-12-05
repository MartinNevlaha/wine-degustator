import React from "react";
import { View, Button, StyleSheet, Dimensions } from "react-native";

import Colors from "../../constants/Colors";

const OwnButton = (props) => {
  return (
    <View style={styles.btnWrapper}>
      <Button
        title={props.title.toString()}
        onPress={() => {console.log('press')}}
        color={!props.isActive ? Colors.btnColor : Colors.btnActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    width: 100,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginVertical: 8
  },
});

export default OwnButton;
