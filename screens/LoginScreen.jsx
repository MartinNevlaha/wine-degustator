import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { useHeaderHeight } from "@react-navigation/stack";

import Colors from "../constants/Colors";
import OwnText from "../components/UI/Text";
import LoginInput from "../components/UI/LoginInput";
import * as action from "../store/actions/index";

const LoginScreen = (props) => {
  const headerHeight = useHeaderHeight();
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
        {!props.auth.loading ? (
          <View style={styles.loginContainer}>
            <OwnText style={styles.title}>Prihlásenie</OwnText>
            <View style={styles.imgContainer}>
              <Image
                style={styles.img}
                source={require("../../assets/glass_wine.png")}
              />
            </View>
            <LoginInput submit={props.onLogin} />
          </View>
        ) : (
          <ActivityIndicator size="large" color="white" />
        )}
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
    height: 550,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
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

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (loginData) => dispatch(action.login(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
