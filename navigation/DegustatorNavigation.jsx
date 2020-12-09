import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";

import DegustatorScreen from "../screens/DegustatorScreen";

const defaultNavOpt = {
  headerBackground: () => (
    <LinearGradient
      colors={["#611C2A", "white"]}
      style={{ flex: 1 }}
      start={{ x: 0.5, y: 0 }}
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
};

const DegustatorStackNavigator = createStackNavigator();

export const DegustatorNavigation = () => {
  return (
    <DegustatorStackNavigator.Navigator screenOptions={defaultNavOpt}>
      <DegustatorStackNavigator.Screen
        name="Degustation"
        component={DegustatorScreen}
      />
    </DegustatorStackNavigator.Navigator>
  );
};
