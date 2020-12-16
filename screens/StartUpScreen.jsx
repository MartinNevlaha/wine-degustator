import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

import Colors from "../constants/Colors";
import * as action from "../store/actions/index";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getBaseUrl = async () => {
      const url = await AsyncStorage.getItem("baseUrl");
      if (!url) {
        return;
      }
      console.log(url)
      dispatch(action.getBaseUrl(url));
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

      console.log(decodedToken.exp, actualTime);

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
    getBaseUrl();
    tryAutoLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
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
