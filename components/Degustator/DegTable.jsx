import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import OwnButton from "../UI/Button";
import Colors from "../../constants/Colors";
import TableElement from "../../components/Degustator/TableElement";
import TableFormater from "../HOC/TableFormater";

const DegTable = (props) => {

  const btnValues = {
    lookClarity: [5, 4, 3, 2, 1],
    lookOutOfClarity: [10, 8, 6, 4, 2],
    smellPurity: [6, 5, 3, 2, 1],
    smellPossitiveIntesity: [8, 7, 6, 4, 2],
    smellQuality: [16, 14, 12, 10, 8],
    tastePurity: [6, 5, 4, 3, 2],
    tastePossitiveIntesity: [8, 7, 6, 4, 2],
    tasteHarmonicPersistence: [8, 7, 6, 5, 4],
    tasteQuality: [22, 19, 16, 13, 10],
    generalImpresion: [11, 10, 9, 8, 7],
  };
  const generateBtn = (btnValues, btnType) => {
    return btnValues.map((btn, index) => {
      return (
        <OwnButton
          title={btn.toString()}
          key={index}
          btnType={btnType}
          btnPress={props.btnPress}
          isActive={props.isActive[btnType][index]}
          index={index}
        />
      );
    });
  };
  const btnsLookClarity = generateBtn(btnValues.lookClarity, "lookClarity");
  const btnslookOutOfClarity = generateBtn(
    btnValues.lookOutOfClarity,
    "lookOutOfClarity"
  );
  const btnsSmellPurity = generateBtn(btnValues.smellPurity, "smellPurity");
  const btnsSmellPossitiveIntesity = generateBtn(
    btnValues.smellPossitiveIntesity,
    "smellPossitiveIntesity"
  );
  const btnsSmellQuality = generateBtn(btnValues.smellQuality, "smellQuality");
  const btnsTastePurity = generateBtn(btnValues.tastePurity, "tastePurity");
  const btnsTastePossitiveIntesity = generateBtn(
    btnValues.tastePossitiveIntesity,
    "tastePossitiveIntesity"
  );
  const btnsTasteHarmonicPersistence = generateBtn(
    btnValues.tasteHarmonicPersistence,
    "tasteHarmonicPersistence"
  );
  const btnsTasteQuality = generateBtn(btnValues.tasteQuality, "tasteQuality");
  const btnsGeneralImpresion = generateBtn(
    btnValues.generalImpresion,
    "generalImpresion"
  );
  const emojiIcons = ["smile-wink", "smile", "meh", "frown", "frown-open"];

  const emoji = emojiIcons.map((emj, i) => (
    <FontAwesome5
      key={i}
      name={emj}
      size={20}
      color="white"
      style={styles.emoji}
    />
  ));

  return (
    <View style={styles.degTableContainer}>
      <TableFormater headTitle="">
        <TableElement btnType={emoji} title="" />
      </TableFormater>
      <TableFormater headTitle="Vzhľad" type="dark">
        <TableElement btnType={btnsLookClarity} title="Čirosť" />
        <TableElement
          btnType={btnslookOutOfClarity}
          title="Vzhľad mimo čírosť"
        />
      </TableFormater>
      <TableFormater headTitle="Vôňa">
        <TableElement btnType={btnsSmellPurity} title="Čistota" />
        <TableElement
          btnType={btnsSmellPossitiveIntesity}
          title="Pozitívna intenzita"
        />
        <TableElement btnType={btnsSmellQuality} title="Kvalita" />
      </TableFormater>
      <TableFormater headTitle="Chuť" type="dark">
        <TableElement btnType={btnsTastePurity} title="Čistota" />
        <TableElement
          btnType={btnsTastePossitiveIntesity}
          title="Pozitívna intenzita"
        />
        <TableElement
          btnType={btnsTasteHarmonicPersistence}
          title="Harmonická perzistencia"
        />
        <TableElement btnType={btnsTasteQuality} title="Kvalita" />
      </TableFormater>
      <TableFormater title="">
        <TableElement btnType={btnsGeneralImpresion} title="Celkový dojem" />
      </TableFormater>
    </View>
  );
};

const styles = StyleSheet.create({
  degTableContainer: {
    width: "75%",
    height: "90%",
    backgroundColor: Colors.primary,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
  },
  tableHeads: {
    flexDirection: "row",
  },
  headers: {
    fontFamily: "open-sans-bold",
    fontSize: 14,
    marginHorizontal: 20,
  },
  emoji: {
    padding: 5,
    marginHorizontal: 50,
  },
});

export default DegTable;
