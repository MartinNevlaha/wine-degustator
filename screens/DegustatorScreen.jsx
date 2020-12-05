import React, { useState } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

import DegTable from "../components/Degustator/DegTable";

const DegustatorScreen = (props) => {
  const initialStyleState = {
    lookClarity: [false, false, false, false, false],
    lookOutOfClarity: [false, false, false, false, false],
    smellPurity: [false, false, false, false, false],
    smellPossitiveIntesity: [false, false, false, false, false],
    smellQuality: [false, false, false, false, false],
    tastePurity: [false, false, false, false, false],
    tastePossitiveIntesity: [false, false, false, false, false],
    tasteHarmonicPersistence: [false, false, false, false, false],
    tasteQuality: [false, false, false, false, false],
    generalImpresion: [false, false, false, false, false],
  };
  const [isActive, setIsActive] = useState(initialStyleState);
  const [values, setValues] = useState({
    lookClarity: null,
    lookOutOfClarity: null,
    smellPurity: null,
    smellPossitiveIntesity: null,
    smellQuality: null,
    tastePurity: null,
    tastePossitiveIntesity: null,
    tasteHarmonicPersistence: null,
    tasteQuality: null,
    generalImpresion: null,
  });

  const btnPressHandler = (value, btnType, index) => {
    setIsActive((prevState) => ({
      ...prevState,
      [btnType]: prevState[btnType].map((state, i) => {
        return i === index;
      }),
    }));
    setValues({
      [btnType]: value
    })
  };
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require("../assets/wine_background.jpg")}
        style={styles.background}
      >
        <DegTable btnPress={btnPressHandler} isActive={isActive} />
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
