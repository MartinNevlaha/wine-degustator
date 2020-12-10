import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

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
    fontSize: 20,
    padding: 10,
  },
  tableContainer: {
    width: "90%",
    height: "85%",
    marginTop: 10,
    overflow: "hidden",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    padding: 5,
    backgroundColor: Colors.secondary,
  },
  cell: {
    width: "14%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  scrollContainer: {
    width: "100%",
    height: "100%",
    overflow: 'hidden'
  },
});

export default ResultsTable;
