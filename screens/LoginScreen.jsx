import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";
import OwnText from "../components/UI/Text";
import LoginInput from "../components/UI/LoginInput";

const LoginScreen = (props) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.container}
    >
      <LinearGradient
        colors={["#611C2A", "white"]}
        style={{ flex: 1 }}
        start={{ x: 1, y: 0 }}
        style={styles.gradContainer}
      >
        <View style={styles.loginContainer}>
          <OwnText style={styles.title}>Prihlásenie</OwnText>
          <View style={styles.imgContainer}>
            <Image
              style={styles.img}
              source={require("../../assets/glass_wine.png")}
            />
          </View>
          <LoginInput />        
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
  loginContainer: {
    width: "60%",
    height: "80%",
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: "center",
    overflow: "hidden"
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 50,
    height: 90,
  },
});

export default LoginScreen;
