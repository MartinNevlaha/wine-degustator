import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import Colors from "../../constants/Colors";
import OwnText from "../UI/Text";

const ContinuosResults = (props) => {
  return (
    <View style={styles.container}>
      <OwnText style={styles.title}>Priebežný výsledok</OwnText>
      <OwnText>Skupina: {props.degInfo.group}</OwnText>
      <OwnText>Číslo degustátora: {props.degInfo.degustatorNumber}</OwnText>
      <View style={styles.inputContainer}>
        <OwnText>Eliminovať víno</OwnText>
        <CheckBox
          tintColors={props.eliminated ? "red" : "white"}
          disabled={false}
          value={props.eliminated}
          onValueChange={(newValue) => props.eliminatedHandler(newValue)}
        />
      </View>
      <OwnText>
        Kategória vína: {props.eliminated ? "Eliminované" : props.wineCategory}
      </OwnText>
      <OwnText>
        Celkom bodov: {props.eliminated ? "Eliminované" : props.totalSum}
      </OwnText>
      <OwnText>Komentár k vínu:</OwnText>
      <View style={styles.commentInput}>
        <TextInput
          style={styles.textInput}
          value={props.comment}
          onChangeText={(text) => props.getComment(text)}
          multiline
          numberOfLines={4}
          editable
        />
      </View>
      <OwnText style={styles.check}>Je hodnotenie v poriadku ?</OwnText>
      <OwnText>Číslo vína: ok</OwnText>
      <OwnText>
        Vaše hodnotenie:{" "}
        {props.isRatingValid ? (
          "Ok"
        ) : (
          <OwnText style={styles.warnText}>Nekompletné</OwnText>
        )}
      </OwnText>
      <View style={styles.btn}>
        <Button
          disabled={!props.isRatingValid}
          title="Odoslať"
          color={Colors.btnColor}
          onPress={() => {
            console.log("pressbtn");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "25%",
    height: "100%",
    backgroundColor: Colors.primary,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    elevation: 10,
    padding: 10,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: "90%",
    height: "100%",
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  check: {
    fontFamily: "open-sans-bold",
    marginVertical: 5,
  },
  commentInput: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  warnText: {
    fontFamily: "open-sans-bold",
    color: "red",
  },
});

export default ContinuosResults;
