import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";

const DEFAULT_PIN = "0000";

export const initialisedPinCode = async () => {
  const isAvaible = await SecureStore.isAvailableAsync();
  if (!isAvaible) {
    Alert.alert(
      "No secure store avaible",
      "This App need the secure storage for right functon",
      [{ text: "Ok" }]
    );
    return;
  }
  const PIN = await SecureStore.getItemAsync("PIN");
  if (!PIN) {
    SecureStore.setItemAsync("PIN", DEFAULT_PIN);
  }
};

export const getPinCode = async () => {
  const PIN = await SecureStore.getItemAsync("PIN");
  if (!PIN) {
    Alert.alert("PIN nie je nastavený", "Kontaktuj autora aplikácie", [
      { text: "Ok" },
    ]);
    return;
  }
  return PIN;
};
