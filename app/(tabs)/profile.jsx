import { Text, Image } from "react-native";
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
      <SafeAreaView className="flex-1 p-5 gap-5 justify-center items-center">
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons name="logout" size={30} color="pink" />
        </TouchableOpacity>
        <Text className="text-white text-3xl font-bold">{user?.username}</Text>
        <Image
          source={{ uri: user?.avatar }}
          style={{ width: 50, height: 50, borderRadius: 50 }}
        />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default Profile;

