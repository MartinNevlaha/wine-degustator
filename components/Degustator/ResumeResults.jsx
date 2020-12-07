import React from "react";
import { View, Image, Button, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import OwnText from "../UI/Text";

const ResumeResults = (props) => {
  return (
    <View style={styles.container}>
      <OwnText style={styles.title}>Vaše hodnotenie</OwnText>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require("../../assets/glass_wine.png")}
        />
      </View>
      <View style={styles.table}>
        <OwnText>Table</OwnText>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <Button title="Uprav" color={Colors.btnColor} onPress={props.cancel}/>
        </View>
        <View style={styles.btn}>
          <Button title="Odošli" color={Colors.btnColor} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: "60%",
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    elevation: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  imgContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 50,
    height: 90,
  },
  btnContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btn: {
    width: 120,
    borderRadius: 10,
    elevation: 10,
    borderColor: "white",
    borderWidth: 1,
    overflow: 'hidden'
  }
});

export default ResumeResults;
