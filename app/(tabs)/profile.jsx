import { Text } from 'react-native'
import React from 'react'
import GradientBackground from '../../components/GradientBackground'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    return (
        <GradientBackground>
            <SafeAreaView className="flex-1 p-5">
                <Text className="text-white text-3xl font-bold">Profile</Text>
            </SafeAreaView>
        </GradientBackground>
    )
}

export default Profile