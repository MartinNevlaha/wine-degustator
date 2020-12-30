import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { SafeAreaView } from "react-native-safe-area-context";

import { initialisedPinCode } from "../utils/pinCode";
import Colors from "../constants/Colors";
import * as action from "../store/actions/index";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getDevice = () => {
      dispatch(action.getDeviceType());
    }
    const getBaseUrl = async () => {
      const url = await AsyncStorage.getItem("baseUrl");
      if (!url) {
        return;
      }
      dispatch(action.getBaseUrl(url));
    };
    const getPin = () => {
      initialisedPinCode()
        .then(() => {})
        .catch((err) => {
          Alert.alert(
            "Chyba Pin kodu",
            err,
            [{ text: "Ok" }]
          );
        });
    };
    const tryAutoLogin = async () => {
      const degData = await AsyncStorage.getItem("degData");
      if (!degData) {
        dispatch(action.setDidTryAutoLogin());
        return;
      }
      const transformDegData = JSON.parse(degData);
      const { token } = transformDegData;
      const decodedToken = jwt_decode(token);
      const actualTime = Date.now() / 1000;

      if (decodedToken.exp <= actualTime || !token) {
        dispatch(action.setDidTryAutoLogin());
        return;
      }
      const { degId, role, degNumber, group, groupId } = decodedToken;
      dispatch(
        action.loginSucces(token, degId, role, degNumber, group, groupId)
      );
      dispatch(action.setAuthTimeout(decodedToken.exp - decodedToken.iat));
    };
    getDevice();
    getPin();
    getBaseUrl();
    tryAutoLogin();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartUpScreen;
