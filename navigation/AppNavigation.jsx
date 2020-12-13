import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { WineNavigation, LoginNavigation } from "./DegustatorNavigation";

const AppNavigation = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const isDegValid = useSelector(state => state.auth.isValid)
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && isDegValid && <WineNavigation />}
      {!isAuth && <LoginNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
