import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { Link } from "expo-router";
import { useAppContext } from "../components/context/Context";
import { getCurrentUser, signInUser } from "../lib/appwrite";

const signUp = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAppContext();
  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Fill all the fields correctly");
    }
    try {
      const user = await signInUser(form.email, form.password);
      const result = await getCurrentUser();
      if (result) {
        setUser(user);
        router.replace("/home");
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  };
  return (
    <GradientBackground>
      <SafeAreaView className="p-6 flex-1 gap-10 w-full justify-center items-center">
        <Text className="text-center text-3xl font-semibold text-white">
          Todo App Sign In
        </Text>
        <FormField
          title="Email"
          placeholder="Enter your email"
          inputValue={form.email}
          handleChange={(e) => setForm({ ...form, email: e })}
        />
        <FormField
          title="Password"
          placeholder="Enter your Password"
          inputValue={form.password}
          handleChange={(e) => setForm({ ...form, password: e })}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          className="w-full bg-secondary p-4 rounded-md text-center justify-center items-center"
        >
          <Text className="text-2xl text-white font-bold font-italic">
            Sign Up
          </Text>
        </TouchableOpacity>
        <View className="flex-row gap-2 items-center">
          <Text className="text-white text-lg">Doesn't have an account</Text>
          <Link
            href="/signUp"
            className="text-secondary font-semibold text-lg italic underline"
          >
            Sign Up
          </Link>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default signUp;
