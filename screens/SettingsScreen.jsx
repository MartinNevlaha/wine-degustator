import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../constants/Colors";
import QrScanner from "../components/UI/QrScanner";
import OwnText from "../components/UI/Text";
import FunctionBtn from "../components/UI/FunctionBtn";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../store/actions/index";
import { isUrlValid } from "../utils/validation";
import PINCode from "../components/UI/PINCode";
import OwnModal from "../components/HOC/Modal";
import PinChange from "../components/UI/PinChange";

const SettingsScreen = (props) => {
  const [isQrScanerShow, setIsQrScannerShow] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const [url, setUrl] = useState({
    url: "",
    isValid: false,
  });

  const tabHeight = useBottomTabBarHeight();
  const dispatch = useDispatch();
  const baseUrl = useSelector((state) => state.settings.baseUrl);
  const isPinValid = useSelector((state) => state.settings.pinValid);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      dispatch(action.clearPin());
      setUrl({
        url: "",
        isValid: false,
      });
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

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
  };

  const togleModal = () => {
    setIsModalShow((prevState) => !prevState);
  };

  return (
    <SafeAreaView style={styles.container}>
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
          {isPinValid ? (
            <View style={styles.settingContainer}>
              <OwnModal isVisible={isModalShow}>
                <PinChange togleModal={togleModal} />
              </OwnModal>
              <OwnText style={styles.title}>Nastavenia</OwnText>
              <ScrollView
                style={styles.scroll}
                contentContainerStyle={{ alignItems: "center" }}
              >
                <View style={styles.settingsWrapper}>
                  {!isQrScanerShow ? (
                    <React.Fragment>
                      <View style={styles.inputContainer}>
                        <OwnText>URL adresa servera</OwnText>
                        <TextInput
                          style={styles.input}
                          value={url.url}
                          onChangeText={(value) => getInputHandler(value)}
                          placeholder={baseUrl}
                          placeholderTextColor="gray"
                        />
                      </View>
                      <View style={styles.btnWrapper}>
                        <FunctionBtn
                          disabled={!url.isValid}
                          clicked={onPressBtnSaveHandler}
                        >
                          Ulož
                        </FunctionBtn>
                      </View>
                      <View style={styles.btnWrapper}>
                        <FunctionBtn clicked={resetSettingHandler}>
                          Resetuj url
                        </FunctionBtn>
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
                      <View style={styles.btnWrapper}>
                        <FunctionBtn clicked={togleModal}>Zmeň PIN</FunctionBtn>
                      </View>
                    </React.Fragment>
                  ) : (
                    <View style={styles.qrWrapper}>
                      <QrScanner qrScanSubmit={saveSettingsHandler} />
                      <View style={styles.btn}>
                        <FunctionBtn clicked={() => setIsQrScannerShow(false)}>
                          Späť
                        </FunctionBtn>
                      </View>
                    </View>
                  )}
                </View>
              </ScrollView>
            </View>
          ) : (
            <PINCode navigation={props.navigation} />
          )}
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    width: "90%",
    height: "90%",
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
  },
  inputContainer: {
    width: "100%",
    justifyContent: "flex-start",
  },
  btnWrapper: {
    marginVertical: wp("1%"),
    marginHorizontal: hp("1%"),
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: hp("3%"),
    marginVertical: wp("1%"),
    marginHorizontal: hp("1%"),
  },
  settingsWrapper: {
    width: "80%",
    marginVertical: wp("1%"),
    marginHorizontal: hp("1%"),
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("0.8%"),
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    color: "white",
  },
  qrScan: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("1%"),
  },
  qrWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  changePinContainer: {
    width: "50%",
  },
  scroll: {
    width: "100%",
  },
});

export default SettingsScreen;
