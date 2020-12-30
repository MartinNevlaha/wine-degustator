import { Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const DEFAULT_PIN = Constants.manifest.extra.defaultPin;

export const initialisedPinCode = async () => {
  try {
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
    return DEFAULT_PIN;
  } catch (error) {
    throw error;
  }
};

export const getPinCode = async () => {
  try {
    const PIN = await SecureStore.getItemAsync("PIN");
    if (!PIN) {
      Alert.alert("PIN nie je nastavený", "Kontaktuj autora aplikácie", [
        { text: "Ok" },
      ]);
      return;
    }
    return PIN;
  } catch (error) {
    throw error;
  }

};

export const setNewPinCode = async (newPin) => {
  try {
    await SecureStore.deleteItemAsync("PIN");
    await SecureStore.setItemAsync("PIN", newPin);
    return newPin;
  } catch (error) {
    throw error;
  }
};
