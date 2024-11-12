import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1, background: "purple" }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="create" />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
