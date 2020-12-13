import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { WineNavigation, LoginNavigation } from "./DegustatorNavigation";

const AppNavigation = (props) => {
  return (
    <NavigationContainer>
      {false && <WineNavigation />}
      <LoginNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
