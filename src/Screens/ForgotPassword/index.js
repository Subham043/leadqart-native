import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, ImageBackground, Image, Button, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import styles from './forgotStyles'

const ForgotPasswordScreen = ({navigation}) => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <View style={{flex:1,width:'100%'}}>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage} />
                <View style={styles.innerContainer}>
                    <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email" />
                    <TouchableOpacity onPress={()=>navigation.navigate('OTP')}>
                        <Text style={styles.signInBtn}>Reset Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
                        <Text style={styles.signUpBtn}>Already a member,<Text style={styles.signUpBtnTxt}> Sign In</Text></Text>
                    </TouchableOpacity>
                </View>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage2} />
            </View>
        </View>
    )
}

export default ForgotPasswordScreen
