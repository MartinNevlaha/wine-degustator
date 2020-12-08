import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";

import OwnButton from "../UI/Button";
import Colors from "../../constants/Colors";
import TableElement from "../../components/Degustator/TableElement";
import TableFormater from "../HOC/TableFormater";
import OwnText from "../UI/Text";
import WineInfo from "../Degustator/Wineinfo";
import WineInput from "../UI/WineInput";

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
          disabled={props.eliminated}
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
      <OwnText style={styles.title}>Hodnotenie vína</OwnText>
      <View style={styles.preHeader}>
        <WineInput
          idOptions={props.idOptions}
          selectedId={props.selectedId}
          getWineId={props.getWineId}
        />
        <View style={styles.errorContainer}>
          {props.wineInfoError && (
            <OwnText style={{ color: "red" }}>
              {props.wineInfoError.message}
            </OwnText>
          )}
        </View>
        <WineInfo />
      </View>
      <TableFormater headTitle="">
        <TableElement title="">{emoji}</TableElement>
      </TableFormater>
      <TableFormater headTitle="Vzhľad" type="dark">
        <TableElement title="Čirosť">{btnsLookClarity}</TableElement>
        <TableElement title="Vzhľad mimo čírosť">
          {btnslookOutOfClarity}
        </TableElement>
      </TableFormater>
      <TableFormater headTitle="Vôňa">
        <TableElement title="Čistota">{btnsSmellPurity}</TableElement>
        <TableElement title="Pozitívna intenzita">
          {btnsSmellPossitiveIntesity}
        </TableElement>
        <TableElement title="Kvalita">{btnsSmellQuality}</TableElement>
      </TableFormater>
      <TableFormater headTitle="Chuť" type="dark">
        <TableElement title="Čistota">{btnsTastePurity}</TableElement>
        <TableElement title="Pozitívna intenzita">
          {btnsTastePossitiveIntesity}
        </TableElement>
        <TableElement title="Harmonická perzistencia">
          {btnsTasteHarmonicPersistence}
        </TableElement>
        <TableElement title="Kvalita">{btnsTasteQuality}</TableElement>
      </TableFormater>
      <TableFormater title="">
        <TableElement title="Celkový dojem">
          {btnsGeneralImpresion}
        </TableElement>
      </TableFormater>
    </View>
  );
};

const styles = StyleSheet.create({
  degTableContainer: {
    width: "72%",
    height: "100%",
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
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    textAlign: "center",
  },
  preHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  errorContainer: {
    width: "40%",
  },
});

const mapStateToProps = (state) => ({
  wineInfoError: state.wineInfo.wineInfo.error,
});

export default connect(mapStateToProps, null)(DegTable);
