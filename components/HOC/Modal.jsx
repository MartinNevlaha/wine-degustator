import React from "react";
import { View, StyleSheet, Modal } from "react-native";

import Colors from "../../constants/Colors";

const OwnModal = (props) => {
  return (
    <Modal visible={props.isVisible} transparent={true} animationType="slide">
      <View style={styles.backDrop}>{props.children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    backgroundColor: Colors.transparentGrey,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OwnModal;
