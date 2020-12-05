import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

import DegTable from "../components/Degustator/DegTable";

const DegustatorScreen = (props) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/wine_background.jpg")}
        style={styles.background}
      >
        <DegTable />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default DegustatorScreen;
