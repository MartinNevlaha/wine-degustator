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
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

import Toast from "../components/UI/Toast";
import Colors from "../constants/Colors";
import OwnText from "../components/UI/Text";
import LoginInput from "../components/UI/LoginInput";
import * as action from "../store/actions/index";

const LoginScreen = (props) => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "" : "position"}
        enabled
        style={styles.container}
        keyboardVerticalOffset={tabBarHeight - 10}
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
              <LoginInput
                submit={props.onLogin}
                isBaseUrlSet={props.isBaseUrlSet}
              />
              {!props.isBaseUrlSet && (
                <View style={styles.settings}>
                  <AntDesign name="warning" size={24} color="red" />
                  <OwnText style={styles.warnInfo}>
                    Nie je nastavená adresa servera!
                  </OwnText>
                </View>
              )}
            </View>
          ) : (
            <ActivityIndicator size="large" color="white" />
          )}
          <Toast visible={props.error} message={props.error && props.error.message} />
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export const screentOptions = () => {
  return {
    tabBarLabel: "Prihlásenie",
    tabBarIcon: () => <Entypo name="login" size={24} color={Colors.primary} />,
  };
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
    height: "70%",
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
    fontSize: hp("3%"),
    marginVertical: wp("1%"),
    marginHorizontal: hp("1%"),
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 30,
    height: 0,
  },
  warnInfo: {
    color: "red",
  },
  settings: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isBaseUrlSet: state.settings.isBaseUrlSet,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (loginData) => dispatch(action.login(loginData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
