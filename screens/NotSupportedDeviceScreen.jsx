import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import OwnText from "../components/UI/Text";

const NotSupportedDeviceScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#611C2A", "white"]}
        style={{ flex: 1 }}
        start={{ x: 1, y: 0 }}
        style={styles.gradContainer}
      >
        <View style={styles.fullWidth}>
          <OwnText style={{ color: "red", fontSize: 30 }}>
            This device is not supported !!!
          </OwnText>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullWidth: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotSupportedDeviceScreen;
