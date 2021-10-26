import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, ImageBackground, Image, Button, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import styles from './styles'

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <ScrollView>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage} />
                <View style={styles.innerContainer}>
                    <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email" />
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
                    <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotBtn}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.signInBtn}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signup')}>
                        <Text style={styles.signUpBtn}>Not yet a member,<Text style={styles.signUpBtnTxt}> Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage2} />
            </ScrollView>
        </View>
    )
}

export default LoginScreen
