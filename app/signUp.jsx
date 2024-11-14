import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import GradientBackground from "../components/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../components/FormField";
import { Link } from "expo-router";

const signUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  return (
    <GradientBackground>
      <SafeAreaView className="p-6 flex-1 gap-10 w-full justify-center items-center">
        <Text className="text-center text-3xl font-semibold text-white">
          Todo App Sign Up
        </Text>
        <FormField
          title="username"
          placeholder="Enter your username"
          inputValue={form.username}
          handleChange={(e) => setForm({ ...form, username: e })}
        />
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
          onPress={() => Alert.alert("hello boy")}
          className="w-full bg-secondary p-4 rounded-md text-center justify-center items-center"
        >
          <Text className="text-2xl text-white font-bold font-italic">
            Sign Up
          </Text>
        </TouchableOpacity>
        <View className="flex-row gap-2 items-center">
          <Text className="text-white text-lg">Already have an account</Text>
          <Link
            href="/signIn"
            className="text-secondary font-semibold text-lg italic underline"
          >
            Sign In
          </Link>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default signUp;
