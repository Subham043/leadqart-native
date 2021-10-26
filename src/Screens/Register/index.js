import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, ImageBackground, Image, Button, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import styles from './registerStyles'

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <ScrollView>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage} />
                <View style={styles.innerContainer}>
                    <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} placeholder="Name" />
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email" />
                    <Text style={styles.label}>Phone</Text>
                    <TextInput style={styles.input} placeholder="Phone" />
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
                    <TouchableOpacity>
                        <Text style={styles.signInBtn}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate('Signin')}>
                        <Text style={styles.signUpBtn}>Already a member,<Text style={styles.signUpBtnTxt}> Sign In</Text></Text>
                    </TouchableOpacity>
                </View>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage2} />
            </ScrollView>
        </View>
    )
}

export default RegisterScreen
