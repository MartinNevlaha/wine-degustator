import React from "react";
import { View, StyleSheet } from "react-native";

import OwnText from "../UI/Text";

const WineInfo = (props) => {
  return (
    <View>
      <OwnText>
        Súťažná kat.:
        {props.wineInfo.competitiveCategory
          ? props.wineInfo.competitiveCategory
          : "Zadaj číslo vína"}
      </OwnText>
      <OwnText>
        Farba:
        {props.wineInfo.color ? props.wineInfo.color : "Zadaj číslo vína"}
      </OwnText>
      <OwnText>
        Charakter:
        {props.wineInfo.character
          ? props.wineInfo.character
          : "Zadaj číslo vína"}
      </OwnText>
      <OwnText>
        Ročník:
        {props.wineInfo.vintage ? props.wineInfo.vintage : "Zadaj číslo vína"}
      </OwnText>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WineInfo;
