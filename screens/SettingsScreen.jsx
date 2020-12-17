import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Image,
  Platform,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../constants/Colors";
import QrScanner from "../components/UI/QrScanner";
import OwnText from "../components/UI/Text";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions/index";
import { isUrlValid } from "../utils/validation";

const SettingsScreen = (props) => {
  const [isQrScanerShow, setIsQrScannerShow] = useState(false);
  const tabHeight = useBottomTabBarHeight();
  const [url, setUrl] = useState({
    url: "",
    isValid: false,
  });

  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.settings.baseUrl);

  const getInputHandler = (value) => {
    setUrl({
      url: value,
      isValid: isUrlValid(value),
    });
  };

  const saveAsyncStorage = async (url) => {
    try {
      const isBaseExist = await AsyncStorage.getItem("baseUrl");
      if (isBaseExist) {
        await AsyncStorage.removeItem("baseUrl");
      }
      await AsyncStorage.setItem("baseUrl", url);
    } catch (error) {
      console.log(error);
    }
  };

  const saveSettingsHandler = async (data) => {
    await saveAsyncStorage(data);
    dispatch(action.setBaseUrl(data));
    setIsQrScannerShow(false);
    props.navigation.navigate("Login");
  };

  const onPressBtnSaveHandler = async () => {
    await saveSettingsHandler(url.url);
    props.navigation.navigate("Login");
  };

  const resetSettingHandler = async () => {
    await AsyncStorage.removeItem("baseUrl");
    dispatch(action.resetBaseUrl());
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "" : "position"}
      enabled
      style={styles.container}
      keyboardVerticalOffset={tabHeight + 10}
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
          <View style={styles.inputWrapper}>
            {!isQrScanerShow ? (
              <React.Fragment>
                <OwnText style={styles.label}>URL adresa servera</OwnText>
                <TextInput
                  style={styles.input}
                  value={url.url}
                  onChangeText={(value) => getInputHandler(value)}
                  placeholder={baseUrl}
                  placeholderTextColor="gray"
                />
                <View style={styles.btn}>
                  <Button
                    title="Ulož"
                    color={Colors.btnColor}
                    disabled={!url.isValid}
                    onPress={onPressBtnSaveHandler}
                  />
                </View>
                <View style={styles.btn}>
                  <Button
                    title="Resetuj"
                    color={Colors.btnColor}
                    onPress={resetSettingHandler}
                  />
                </View>
                <View style={styles.qrScan}>
                  <OwnText>Načítaj nastavenia cez QR kód</OwnText>
                  <AntDesign
                    name="qrcode"
                    size={80}
                    color="white"
                    onPress={() => setIsQrScannerShow(true)}
                  />
                </View>
              </React.Fragment>
            ) : (
              <View style={styles.qrWrapper}>
                <QrScanner qrScanSubmit={saveSettingsHandler} />
                <View style={styles.btn}>
                  <Button
                    title="Naspäť"
                    color={Colors.btnColor}
                    onPress={() => setIsQrScannerShow(false)}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screentOptions = () => {
  return {
    tabBarLabel: "Nastavenia",
    tabBarIcon: () => (
      <AntDesign name="setting" size={24} color={Colors.primary} />
    ),
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
  settingContainer: {
    width: "60%",
    height: 570,
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  btn: {
    width: "90%",
    margin: 15,
    overflow: "hidden",
    borderRadius: 10,
  },
  img: {
    width: 50,
    height: 90,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    margin: 10,
  },
  inputWrapper: {
    width: "80%",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "white",
  },
  qrScan: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  qrWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});

export default SettingsScreen;
