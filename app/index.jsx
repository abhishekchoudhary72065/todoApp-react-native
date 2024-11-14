import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useAppContext } from "../components/context/Context";

const App = () => {
  const { todos } = useAppContext();
  console.log(todos);
  return (
    <SafeAreaView className="flex-1 bg-red-500">
      <View className="p-5 gap-5">
        <Text className="text-white text-3xl font-bold">App</Text>
        <Link
          href="/home"
          className="w-full bg-white text-black font-bold text-2xl text-center rounded-xl shadow-md py-5"
        >
          Go to Home Page
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default App;
