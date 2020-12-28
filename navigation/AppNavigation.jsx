import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { WineNavigation, StartUpTabNavigator } from "./DegustatorNavigation";
import StartUpScreen from "../screens/StartUpScreen";

const AppNavigation = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const isDegValid = useSelector((state) => state.auth.isValid);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isAuth && isDegValid && <WineNavigation />}
        {!isAuth && didTryAutoLogin && <StartUpTabNavigator />}
        {!isAuth && !didTryAutoLogin && <StartUpScreen />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
