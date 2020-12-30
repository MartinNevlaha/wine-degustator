import React, { useState } from "react";
import { LogBox } from 'react-native';
import * as Font from "expo-font";
import { AppLoading } from "expo";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigation from "./navigation/AppNavigation";

import degustationReducer from "./store/reducers/degustation";
import wineInfoReducer from "./store/reducers/wineInfo";
import degResultsReducer from "./store/reducers/degResults";
import authReducer from "./store/reducers/Auth";
import settingsReducer from "./store/reducers/settings";

const rootReducer = combineReducers({
  degReducer: degustationReducer,
  wineInfo: wineInfoReducer,
  degResults: degResultsReducer,
  auth: authReducer,
  settings: settingsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  LogBox.ignoreLogs(["Setting a timer"]); // fix issue with setting a timer for token

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigation />
      </SafeAreaProvider>
    </Provider>
  );
}
