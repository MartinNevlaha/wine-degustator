import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import DegustatorScreen from "../screens/DegustatorScreen";

const DegustatorStackNavigator = createStackNavigator();

export const DegustatorNavigation = () => {
  return (
    <DegustatorStackNavigator.Navigator>
      <DegustatorStackNavigator.Screen
        name="Degustácia"
        component={DegustatorScreen}
      />
    </DegustatorStackNavigator.Navigator>
  );
};
