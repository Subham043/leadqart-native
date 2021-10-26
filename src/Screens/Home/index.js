import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar style="light" />
            <ImageBackground source={require('../../../assets/images/waves-new.png')} style={styles.backgroundImage} />
            <View style={styles.innerContainer}>

                <Image source={require('../../../assets/images/logo-small.png')} style={styles.logoImage} />
                <Text style={styles.heading}>Welcome</Text>
                <Text style={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                        <Text style={styles.btn1}>
                        Sign Up
                        </Text>
                    </TouchableOpacity >
                    <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
                        <Text style={styles.btn2}>
                        Sign In
                        </Text>
                    </TouchableOpacity >
                </View>
            </View>
            <ImageBackground source={require('../../../assets/images/waves-new.png')} style={styles.backgroundImage2} />
        </View>
    )
}

export default HomeScreen
