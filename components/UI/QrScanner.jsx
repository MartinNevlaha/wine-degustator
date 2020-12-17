import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import OwnText from "../../components/UI/Text";

const QrScanner = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    return () => {
      setScanned(false)
    };
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    let scanedData;
    if (props.scanType === "object") {
      scanedData = JSON.parse(data);
    } else {
      scanedData = data;
    }
    if (!scanedData) {
      Alert.alert("Chyba", "Nepodarilo sa odskenovať QR kód", [{ text: "Ok" }]);
    }
    props.qrScanSubmit(scanedData);
  };

  if (hasPermission === null) {
    return <ActivityIndicator size="large" color="white" />;
  }
  if (hasPermission === false) {
    Alert.alert("Oprávnenie", "Nemám oprávnenie pre používanie kamery", [
      { text: "ok" },
    ]);
  }

  return (
    <View style={styles.qrScanner}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  qrScanner: {
    width: "45%",
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    overflow: "hidden",
  },
});

export default QrScanner;
