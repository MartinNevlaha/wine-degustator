import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Foundation,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import OwnText from "../components/UI/Text";

import DegustatorScreen, {
  screenOptions as degScreenOpt,
} from "../screens/DegustatorScreen";
import ResultsScreen, {
  screenOptions as resScreenOpt,
} from "../screens/ResultsScreen";
import Colors from "../constants/Colors";
import LoginScreen, {
  screentOptions as logScreenOpt,
} from "../screens/LoginScreen";
import * as action from "../store/actions/index";
import SettingsScreen, {
  screentOptions as setScreenOpt,
} from "../screens/SettingsScreen";

const defaultNavOpt = {
  headerBackground: () => (
    <LinearGradient
      colors={["#611C2A", "white"]}
      style={{ flex: 1 }}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1.2, y: 0 }}
    />
  ),
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  headerTintColor: "white",
  headerRight: () => (
    <ImageBackground
      source={require("../assets/splash_wine.png")}
      style={styles.imgContainer}
    >
      <OwnText style={styles.imgText}>Wine Degustator</OwnText>
    </ImageBackground>
  ),
};

const DegustatorStackNavigator = createStackNavigator();

export const DegustatorNavigation = () => {
  return (
    <DegustatorStackNavigator.Navigator screenOptions={defaultNavOpt}>
      <DegustatorStackNavigator.Screen
        name="Degustation"
        component={DegustatorScreen}
        options={degScreenOpt}
      />
    </DegustatorStackNavigator.Navigator>
  );
};

const ResultsStackNavigator = createStackNavigator();

export const ResultsNavigation = () => {
  return (
    <ResultsStackNavigator.Navigator screenOptions={defaultNavOpt}>
      <ResultsStackNavigator.Screen
        name="Results"
        component={ResultsScreen}
        options={resScreenOpt}
      />
    </ResultsStackNavigator.Navigator>
  );
};

const StartUpNavigator = createBottomTabNavigator();

export const StartUpTabNavigator = () => {
  return (
    <StartUpNavigator.Navigator
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.primary,
        inactiveBackgroundColor: Colors.transparentGrey2,
      }}
    >
      <StartUpNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={logScreenOpt}
      />
      <StartUpNavigator.Screen
        name="Settings"
        component={SettingsScreen}
        options={setScreenOpt}
      />
    </StartUpNavigator.Navigator>
  );
};

const WineDegustatorNavigator = createDrawerNavigator();

export const WineNavigation = () => {
  const dispatch = useDispatch();
  return (
    <WineDegustatorNavigator.Navigator
      drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <LinearGradient
              colors={["#611C2A", "white"]}
              style={{ flex: 1 }}
              start={{ x: 0.7, y: 0 }}
            >
              <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                  <View style={styles.logo}>
                    <OwnText
                      style={{
                        color: "red",
                        fontFamily: "open-sans-bold",
                        fontSize: 18,
                      }}
                    >
                      Wine Degustator
                    </OwnText>
                    <Image
                      source={require("../assets/Logo.png")}
                      style={{ width: 60, height: 54 }}
                    />
                  </View>
                </View>
                <DrawerItemList {...props} />
                <View
                  style={{
                    width: "100%",
                    height: "65%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "40%",
                      padding: 5,
                      backgroundColor: Colors.btnColor,
                      alignItems: "center",
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "white",
                    }}
                    onPress={() => dispatch(action.logout())}
                  >
                    <OwnText>Odhlásiť</OwnText>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </LinearGradient>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: "white",
        inactiveTintColor: "white",
      }}
    >
      <WineDegustatorNavigator.Screen
        name="Degustácia"
        component={DegustatorNavigation}
        options={{
          drawerIcon: (props) => (
            <MaterialCommunityIcons name="glass-wine" size={20} color="white" />
          ),
        }}
      />
      <WineDegustatorNavigator.Screen
        name="Výsledky"
        component={ResultsNavigation}
        options={{
          drawerIcon: (props) => (
            <Foundation name="results" size={20} color="white" />
          ),
        }}
      />
    </WineDegustatorNavigator.Navigator>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: 430,
    height: 56,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  logo: {
    width: "90%",
    height: 56,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "baseline",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    margin: 10,
  },
  imgText: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
    color: "red",
    padding: 10,
  },
});
