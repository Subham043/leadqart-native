import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, ImageBackground, Image, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'
import axios from "../../../axios"
import Loader from '../../Components/Loader'
import Toaster from '../../Components/Toaster'
import ErrorToaster from '../../Components/ErrorToaster'

const LoginScreen = ({ navigation }) => {

    const [showLoader, setShowLoader] = useState(false)
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState("")
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")

    const [email, setEmail] = useState("")
    const [emailErrorValue, setEmailErrorValue] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordErrorValue, setPasswordErrorValue] = useState("")
    const [passwordError, setPasswordError] = useState(false)

    const emailHandler = (text) => {
        setEmail(text);
        if (text == '') {
            setEmailError(true)
            setEmailErrorValue('Please enter your email')
            return;
        } else if (!(/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(text))) {
            setEmailError(true)
            setEmailErrorValue('Please enter a valid email')
            return;
        } else {
            setEmailError(false)
            setEmailErrorValue('')
        }
    }

    const passwordHandler = (text) => {
        setPassword(text);
        if (text == '') {
            setPasswordError(true)
            setPasswordErrorValue('Please enter your password')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setPasswordError(true)
            setPasswordErrorValue('Please enter a valid password')
            return;
        } else {
            setPasswordError(false)
            setPasswordErrorValue('')
        }
    }

    const signIn = async () => {

        if (email == '') {
            setEmailError(true)
            setEmailErrorValue('Please enter your email')
            return;
        } else {
            setEmailError(false)
            setEmailErrorValue('')
        }

        if (password == '') {
            setPasswordError(true)
            setPasswordErrorValue('Please enter your password')
            return;
        } else {
            setPasswordError(false)
            setPasswordErrorValue('')
        }

        if (emailError || passwordError) {
            return ;
        } else {
            setShowLoader(true)
            try {
                const response = await axios.post('/login', { email, password },);
                setShowLoader(false)
                if(response?.data?.message){
                    setShowToasterMsg(response?.data?.message)
                    setShowToaster(true)
                    setTimeout(() => {
                        setShowToaster(false)
                    }, 1000);
                    // navigation.navigate('OTP', {
                    //     id: response.data.id,
                    //     msg: response.data.message,
                    //   });
                }

                if(response?.data?.rateLimit){
                    setShowErrorToasterMsg(response?.data?.rateLimit)
                    setShowErrorToaster(true)
                    setTimeout(() => {
                        setShowErrorToaster(false)
                    }, 1000);
                }

                if(response?.data?.error){
                    setShowErrorToasterMsg(response?.data?.error)
                    setShowErrorToaster(true)
                    setTimeout(() => {
                        setShowErrorToaster(false)
                    }, 1000);
                }

                if (response?.data?.errors?.email) {
                    setEmailError(true)
                    setEmailErrorValue(response?.data?.errors?.email.msg)
                }

                if (response?.data?.errors?.password) {
                    setPasswordError(true)
                    setPasswordErrorValue(response?.data?.errors?.password?.msg)
                }
                
            } catch (error) {
                setShowLoader(false)
                console.log(error);
            }
        }



    }


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
                    <TextInput style={emailError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="Email" placeholderTextColor={emailError ? "red" : "#ccc"} onChangeText={text => emailHandler(text)} defaultValue={email} />
                    {emailError ? <Text style={styles.error}>{emailErrorValue}</Text> : null}
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={passwordError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="Password" placeholderTextColor={passwordError ? "red" : "#ccc"} secureTextEntry={true} onChangeText={text => passwordHandler(text)} defaultValue={password} />
                    {passwordError ? <Text style={styles.error}>{passwordErrorValue}</Text> : null}
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotBtn}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signIn}>
                        <Text style={styles.signInBtn}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signUpBtn}>Not yet a member,<Text style={styles.signUpBtnTxt}> Sign Up</Text></Text>
                    </TouchableOpacity>
                </View>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage2} />
            </ScrollView>
            <Loader status={showLoader} />
            <Toaster message={showToasterMsg} status={showToaster} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
        </View>
    )
}

export default LoginScreen
