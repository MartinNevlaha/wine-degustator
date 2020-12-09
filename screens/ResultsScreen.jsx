import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import OwnText from "../components/UI/Text";
import HeaderButton from '../components/UI/HeaderButton';

const ResultsScreen = (props) => {
  return (
    <View style={StyleSheet.mainContainer}>
      <ImageBackground
        source={require("../assets/wine_background.jpg")}
        style={styles.background}
      >
        <OwnText>ResultsScrren</OwnText>
      </ImageBackground>
    </View>
  );
};
export const screenOptions = (navData) => {
  return {
    headerTitle: "Vaše výsledky",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="md-menu" onPress={() => navData.navigation.toggleDrawer()}/>
      </HeaderButtons>
    )
  }
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

export default ResultsScreen;
