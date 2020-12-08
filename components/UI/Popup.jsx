import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";

const Popup = (props) => {
  return (
    <View>
      <Text>Message</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  popupWrapper: {
    width: "30%",
    height: "20%",
    backgroundColor: "red",
  },
});

export default Popup;
