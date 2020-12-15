import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  Platform,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { useHeaderHeight } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import OwnText from "../components/UI/Text";
import LoginInput from "../components/UI/LoginInput";

const SettingsScreen = (props) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "" : "position"}
      enabled
      style={styles.container}
      keyboardVerticalOffset={headerHeight + 10}
    >
      <LinearGradient
        colors={["#611C2A", "white"]}
        style={{ flex: 1 }}
        start={{ x: 1, y: 0 }}
        style={styles.gradContainer}
      >
        <View style={styles.settingContainer}>
          <OwnText style={styles.title}>Nastavenia</OwnText>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require("../../assets/glass_wine.png")}
            />
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingContainer: {
    width: "60%",
    height: 550,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default SettingsScreen;
