import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import OwnText from "../UI/Text";
import Colors from "../../constants/Colors";
import TableRow from "../Degustator/TableRow";

const ResultsTable = (props) => {
  return (
    <View style={styles.container}>
      <OwnText style={styles.title}>Vaše hodnotenia vín</OwnText>
      <View style={styles.tableContainer}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <OwnText>Číslo vína</OwnText>
          </View>
          <View style={styles.cell}>
            <OwnText>Farba vína</OwnText>
          </View>
          <View style={styles.cell}>
            <OwnText>Charakter vína</OwnText>
          </View>
          <View style={styles.cell}>
            <OwnText>Eliminované</OwnText>
          </View>
          <View style={styles.cell}>
            <OwnText>Kategória vína</OwnText>
          </View>
          <View style={styles.cell}>
            <OwnText>Celkový súčet</OwnText>
          </View>
        </View>
        <View style={styles.scrollContainer}>
          <FlatList
            data={props.results}
            keyExtractor={(item) => item._id}
            renderItem={(itemData) => (
              <TableRow
                wineId={itemData.item.wineInfo.wineId}
                color={itemData.item.wineInfo.color}
                character={itemData.item.wineInfo.character}
                eliminated={itemData.item.eliminated}
                wineCategory={itemData.item.wineCategory}
                totalSum={itemData.item.totalSum}
                _id={itemData.item._id}
                clicked={props.clicked}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "85%",
    height: "70%",
    backgroundColor: Colors.primary,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: hp("3%"),
    paddingHorizontal: wp("1%"),
    paddingVertical: hp("1%"),
  },
  tableContainer: {
    width: "90%",
    height: "85%",
    marginTop: hp("1.5%"),
    overflow: "hidden",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    paddingHorizontal: wp("0.5%"),
    paddingVertical: hp("0.5%"),
    backgroundColor: Colors.secondary,
  },
  cell: {
    width: "14%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp("0.5%"),
    marginVertical: hp("0.5%"),
  },
  scrollContainer: {
    width: "100%",
    height: "100%",
    overflow: 'hidden'
  },
});

export default ResultsTable;
