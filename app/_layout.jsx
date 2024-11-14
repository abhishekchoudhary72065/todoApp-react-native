import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";
import AppContextProvider from "../components/context/Context";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, background: "purple" }}>
      <AppContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="signUp" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AppContextProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
