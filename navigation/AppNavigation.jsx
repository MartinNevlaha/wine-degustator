import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { WineNavigation, StartUpTabNavigator } from "./DegustatorNavigation";
import StartUpScreen from "../screens/StartUpScreen";
import NotSupportedDeviceScreen from '../screens/NotSupportedDeviceScreen';

const AppNavigation = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const isDeviceTablet = useSelector(state => state.settings.isDeviceTablet)
  const isDegValid = useSelector((state) => state.auth.isValid);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
      <NavigationContainer>
        {isDeviceTablet && isAuth && isDegValid && <WineNavigation />}
        {isDeviceTablet && !isAuth && didTryAutoLogin && <StartUpTabNavigator />}
        {!isDeviceTablet && <NotSupportedDeviceScreen />}
        {!isAuth && !didTryAutoLogin && <StartUpScreen />}
      </NavigationContainer>
  );
};

export default AppNavigation;
