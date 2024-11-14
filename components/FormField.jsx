import { View, TextInput } from "react-native";
import React from "react";

const FormField = ({ title, placeholder, handleChange, inputValue }) => {
  return (
    <View className="gap-7 w-full">
      <TextInput
        value={inputValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={"#cccccc"}
        className="p-4 rounded-md border-2 border-secondary text-white focus:border-teal-200"
        keyboardType={title === "Email" ? "email-address" : ""}
      />
    </View>
  );
};

export default FormField;
