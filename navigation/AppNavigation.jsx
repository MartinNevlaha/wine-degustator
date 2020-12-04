import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { DegustatorNavigation } from "./DegustatorNavigation";

const AppNavigation = (props) => {
  return (
    <NavigationContainer>
      <DegustatorNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;
