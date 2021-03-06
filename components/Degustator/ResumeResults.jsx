import React from "react";
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Colors from "../../constants/Colors";
import OwnText from "../UI/Text";
import FunctionButton from "../UI/FunctionBtn";
import TableFormater from "../HOC/TableFormater";
import TableElement from "../Degustator/TableElement";

const ResumeResults = (props) => {
  let content = <ActivityIndicator size="large" color="white" />;
  if (!props.loading) {
    content = (
      <React.Fragment>
        <OwnText style={styles.title}>Vaše hodnotenie</OwnText>
        {props.type !== "degResults" && (
          <OwnText>Víno číslo: {props.sendData.wineId}</OwnText>
        )}
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={require("../../assets/glass_wine.png")}
          />
        </View>
        {!props.sendData.eliminated ? (
          <React.Fragment>
            <View style={styles.table}>
              <TableFormater headTitle="Vzhľad" type="dark">
                <TableElement title="Čírosť">
                  <OwnText style={styles.values}>
                    {props.sendData.results.lookClarity}
                  </OwnText>
                </TableElement>
                <TableElement title="Vzhľad mimo čírosť">
                  <OwnText style={styles.values}>
                    {props.sendData.results.lookOutOfClarity}
                  </OwnText>
                </TableElement>
              </TableFormater>
              <TableFormater headTitle="Vôňa">
                <TableElement title="Čistota">
                  <OwnText style={styles.values}>
                    {props.sendData.results.smellPurity}
                  </OwnText>
                </TableElement>
                <TableElement title="Pozitívna intenzita">
                  <OwnText style={styles.values}>
                    {props.sendData.results.smellPossitiveIntesity}
                  </OwnText>
                </TableElement>
                <TableElement title="Kvalita">
                  <OwnText style={styles.values}>
                    {props.sendData.results.smellQuality}
                  </OwnText>
                </TableElement>
              </TableFormater>
              <TableFormater headTitle="Chuť" type="dark">
                <TableElement title="Čístota">
                  <OwnText style={styles.values}>
                    {props.sendData.results.tastePurity}
                  </OwnText>
                </TableElement>
                <TableElement title="Pozitívna intenzita">
                  <OwnText style={styles.values}>
                    {props.sendData.results.tastePossitiveIntesity}
                  </OwnText>
                </TableElement>
                <TableElement title="Harmonická perzistencia">
                  <OwnText style={styles.values}>
                    {props.sendData.results.tasteHarmonicPersistence}
                  </OwnText>
                </TableElement>
                <TableElement title="Kvalita">
                  <OwnText style={styles.values}>
                    {props.sendData.results.tasteQuality}
                  </OwnText>
                </TableElement>
              </TableFormater>
              <TableFormater headTitle="">
                <TableElement title="Celkový dojem">
                  <OwnText style={styles.values}>
                    {props.sendData.results.generalImpresion}
                  </OwnText>
                </TableElement>
              </TableFormater>
            </View>
            <View style={styles.table}>
              <View style={styles.finalTable}>
                <View style={styles.left}>
                  <OwnText style={styles.values}>Kategória vína</OwnText>
                </View>
                <View style={styles.right}>
                  <OwnText style={styles.values}>
                    {props.sendData.wineCategory}
                  </OwnText>
                </View>
              </View>
              <View style={styles.finalTable}>
                <View style={styles.left}>
                  <OwnText style={styles.values}>Spolu bodov</OwnText>
                </View>
                <View style={styles.right}>
                  <OwnText style={styles.values}>
                    {props.sendData.totalSum}
                  </OwnText>
                </View>
              </View>
            </View>
          </React.Fragment>
        ) : (
          <View style={styles.eliminated}>
            <OwnText>Víno ste eliminovali</OwnText>
            {props.sendData.comment ? (
              <OwnText>Koment degustátora: {props.sendData.comment}</OwnText>
            ) : null}
          </View>
        )}
        <View style={styles.btnContainer}>
          {props.type !== "degResults" && (
              <FunctionButton clicked={props.cancel}>
                Uprav
              </FunctionButton>
          )}
            <FunctionButton clicked={props.submit}>
              {props.type === "degResults" ? "Ok" : "Odoslať"}
            </FunctionButton>
        </View>
      </React.Fragment>
    );
  }
  return (
    <View style={!props.loading ? styles.container : styles.containerLoader}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    minWidth: "50%",
    minHeight: "30%",
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
  },
  containerLoader: {
    width: "50%",
    minWidth: "50%",
    minHeight: "30%",
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: hp("3%"),
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 30,
    height: 50,
  },
  btnContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginVertical: hp("2%"),
  },
  btn: {
    width: wp("15%"),
    borderRadius: 10,
    elevation: 10,
    borderColor: "white",
    borderWidth: 1,
    overflow: "hidden",
  },
  eliminated: {
    paddingVertical: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    width: "80%",
    marginHorizontal: wp("2%"),
    marginVertical: hp("2%"),
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 10,
  },
  values: {
    marginHorizontal: hp("8%"),
    textAlign: "center",
  },
  finalTable: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  left: {
    width: "50%",
  },
  right: {
    width: "50%",
  },
});

export default ResumeResults;
