import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import OwnText from "../components/UI/Text";

import DegustatorScreen, {
  screenOptions as degScreenOpt,
} from "../screens/DegustatorScreen";
import ResultsScreen, {
  screenOptions as resScreenOpt,
} from "../screens/ResultsScreen";
import Colors from "../constants/Colors";

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

const WineDegustatorNavigator = createDrawerNavigator();

export const WineNavigation = () => {
  return (
    <WineDegustatorNavigator.Navigator
      drawerContentOptions={{ activeTintColor: Colors.btnActive }}
    >
      <WineDegustatorNavigator.Screen
        name="Degustácia"
        component={DegustatorNavigation}
      />
      <WineDegustatorNavigator.Screen
        name="Výsledky"
        component={ResultsNavigation}
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
  imgText: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
    color: "red",
    padding: 10,
  },
});
