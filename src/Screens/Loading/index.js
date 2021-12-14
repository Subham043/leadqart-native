import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Image, Text, TouchableOpacity, Animated, ActivityIndicator, } from 'react-native'
import styles from './styles'

const LoadingScreen = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#ffa200" />
            <ImageBackground source={require('../../../assets/images/waves-new.png')} style={styles.backgroundImage} />
            <View style={styles.innerContainer}>

                <Image source={require('../../../assets/images/logo-small.png')} style={styles.logoImage} />
                <View style={styles.btnContainer}>
                    <Animated.View style={styles.loader}>
                        <ActivityIndicator size="large" color="#33b9ff" />
                    </Animated.View>
                </View>
            </View>
            <ImageBackground source={require('../../../assets/images/waves-new.png')} style={styles.backgroundImage2} />
        </View>
    )
}

export default LoadingScreen
