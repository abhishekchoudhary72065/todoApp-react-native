import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const create = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "purple", padding: 20 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ color: "white", fontSize: 25, fontWeight: "800" }}>
          Create Page
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: "white",
            borderRadius: 5,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default create;
