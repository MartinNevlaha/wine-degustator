import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { WineNavigation } from "./DegustatorNavigation";

const AppNavigation = (props) => {
  return (
    <NavigationContainer>
      <WineNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
