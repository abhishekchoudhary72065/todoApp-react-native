import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const GradientBackground = ({ children }) => {
    return (
        <LinearGradient style={{ flex: 1 }} colors={["#322f49", "#20202f"]}>
            {children}
        </ LinearGradient >
    )
}

export default GradientBackground