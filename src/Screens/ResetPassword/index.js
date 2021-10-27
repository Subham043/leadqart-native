import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, ImageBackground, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './resetStyles'

const ResetPasswordScreen = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <ScrollView>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage} />
                <View style={styles.innerContainer}>
                    <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>OTP</Text>
                    <TextInput style={styles.input} placeholder="OTP" secureTextEntry={true} />
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} />
                    <TouchableOpacity>
                        <Text style={styles.signInBtn}>Reset</Text>
                    </TouchableOpacity>
                </View>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage2} />
            </ScrollView>
        </View>
    )
}

export default ResetPasswordScreen
