import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Redirect } from "expo-router";
import { useAppContext } from "../components/context/Context";

const App = () => {
  const { user } = useAppContext();
  if (user) return <Redirect href="/home" />;
  return (
    <SafeAreaView className="flex-1 bg-red-500 items-center justify-center">
      <View className="px-10 gap-10 w-full text-center items-center">
        <Text className="text-white text-3xl font-bold">Todo App</Text>
        <View className="gap-4 w-full">
          <Link
            href="/signUp"
            className="w-full bg-white text-black font-bold text-2xl text-center rounded-xl shadow-md py-5"
          >
            Create Account First
          </Link>
          <Link
            href="/signIn"
            className="w-full bg-white text-black font-bold text-2xl text-center rounded-xl shadow-md py-5"
          >
            Login
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
