import { Text, Image, View } from "react-native";
import React from "react";
import GradientBackground from "../../components/GradientBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "../../components/context/Context";
import { TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser } = useAppContext();
  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.replace("/signIn");
  };

  return (
    <GradientBackground>
      <SafeAreaView className="flex-1 p-5 gap-10 justify-center items-center">
        <TouchableOpacity onPress={handleLogout} className="flex-row items-center gap-2 border border-pink-200 py-3 px-6 rounded-md">
          <MaterialIcons name="logout" size={25} color="pink" />
          <Text className="text-pink-300 text-3xl">Logout</Text>
        </TouchableOpacity>
        <View className="gap-4 items-center">
          <Image
            source={{ uri: user?.avatar }}
            style={{ width: 65, height: 65, borderRadius: 50 }}
          />
          <Text className="text-white text-3xl font-bold">{user?.username}</Text>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default Profile;
