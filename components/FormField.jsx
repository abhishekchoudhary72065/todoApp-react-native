import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const FormField = ({ title, placeholder, handleChange, inputValue }) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <View className="w-full relative">
      <TextInput
        value={inputValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={"#cccccc"}
        className="p-4 rounded-md border-2 border-orange-400 text-white focus:border-teal-200"
        keyboardType={title === "Email" ? "email-address" : ""}
        secureTextEntry={title === "Password" && !showPass}
      />
      {title === "Password" && (
        <TouchableOpacity
          className="absolute top-6 right-5"
          onPress={() => setShowPass(!showPass)}
        >
          <Feather name={showPass ? "eye-off" : "eye"} size={21} color="#ccc" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormField;
