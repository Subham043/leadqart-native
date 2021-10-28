import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, ImageBackground, Image, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import styles from './resetStyles'
import axios from "../../../axios"
import Loader from '../../Components/Loader'
import Toaster from '../../Components/Toaster'
import ErrorToaster from '../../Components/ErrorToaster'
import SuccessPopUp from '../../Components/SuccessPopUp'


const ResetPasswordScreen = ({ route, navigation }) => {


    const [displayTranslate, setDisplayTranslate] = useState(true)
    const [displayTranslate2, setDisplayTranslate2] = useState(false)

    const { id, msg } = route.params;

    useEffect(() => {
        if (id === undefined || id === null || msg === undefined || msg === null) {
            navigation.navigate('Home');
        } else {
            setShowToasterMsg(msg)
            setShowToaster(true)
            setTimeout(() => {
                setShowToaster(false)
            }, 1000);
        }
    }, [id, msg])

    const [showLoader, setShowLoader] = useState(false)
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState("")
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [successPopUpMsg, setSuccessPopUpMsg] = useState("")

    const [otp, setOtp] = useState("")
    const [otpErrorValue, setOtpErrorValue] = useState("")
    const [otpError, setOtpError] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordErrorValue, setPasswordErrorValue] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [cPassword, setCPassword] = useState("")
    const [cPasswordErrorValue, setCPasswordErrorValue] = useState("")
    const [cPasswordError, setCPasswordError] = useState(false)

    const otpHandler = (text) => {
        setOtp(text);
        if (text == '') {
            setOtpError(true)
            setOtpErrorValue('Please enter your otp')
            return;
        } else if (!(/^[0-9\s]*$/.test(text)) || text.length > 6 || text.length < 6) {
            setOtpError(true)
            setOtpErrorValue('Please enter a valid otp')
            return;
        } else {
            setOtpError(false)
            setOtpErrorValue('')
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

    const cpasswordHandler = (text) => {
        setCPassword(text);
        if (text == '') {
            setCPasswordError(true)
            setCPasswordErrorValue('Please enter your confirm password')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setCPasswordError(true)
            setCPasswordErrorValue('Please enter a valid confirm password')
            return;
        } else if (text != password) {
            setCPasswordError(true)
            setCPasswordErrorValue('Password and confirm password must be same')
            return;
        } else {
            setCPasswordError(false)
            setCPasswordErrorValue('')
        }
    }

    const verify = async () => {

        if (otp == '') {
            setOtpError(true)
            setOtpErrorValue('Please enter your otp')
            return;
        } else {
            setOtpError(false)
            setOtpErrorValue('')
        }

        if (password == '') {
            setPasswordError(true)
            setPasswordErrorValue('Please enter your password')
            return;
        } else {
            setPasswordError(false)
            setPasswordErrorValue('')
        }

        if (cPassword == '') {
            setCPasswordError(true)
            setCPasswordErrorValue('Please enter your confirm password')
            return;
        } else {
            setCPasswordError(false)
            setCPasswordErrorValue('')
        }

        if (otpError || passwordError || cPasswordError) {
            return;
        } else {
            setShowLoader(true)
            try {
                const response = await axios.post(`/reset-password/${id}`, { otp, password, cpassword: cPassword },);
                setShowLoader(false)

                if (response?.data?.message) {
                    setSuccessPopUpMsg(response?.data?.message)
                    setDisplayTranslate(false)
                    setDisplayTranslate2(true)
                }

                if (response?.data?.rateLimit) {
                    setShowErrorToasterMsg(response?.data?.rateLimit)
                    setShowErrorToaster(true)
                    setTimeout(() => {
                        setShowErrorToaster(false)
                    }, 1000);
                }

                if (response?.data?.error) {
                    setShowErrorToasterMsg(response?.data?.error)
                    setShowErrorToaster(true)
                    setTimeout(() => {
                        setShowErrorToaster(false)
                    }, 1000);
                }

                if (response?.data?.errors?.otp) {
                    setOtpError(true)
                    setOtpErrorValue(response?.data?.errors?.otp.msg)
                }

                if (response?.data?.errors?.password) {
                    setPasswordError(true)
                    setPasswordErrorValue(response?.data?.errors?.password?.msg)
                }

                if (response?.data?.errors?.cpassword) {
                    setCPasswordError(true)
                    setCPasswordErrorValue(response?.data?.errors?.cpassword?.msg)
                }

            } catch (error) {
                setShowLoader(false)
                console.log(error.response.data);

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
                {displayTranslate ? 
                <View style={styles.formContainer}>
                    <Text style={styles.label}>OTP</Text>
                    <TextInput style={otpError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="OTP" placeholderTextColor={otpError ? "red" : "#ccc"} secureTextEntry={true} onChangeText={text => otpHandler(text)} defaultValue={otp} />
                    {otpError ? <Text style={styles.error}>{otpErrorValue}</Text> : null}
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={passwordError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="Password" placeholderTextColor={passwordError ? "red" : "#ccc"} secureTextEntry={true} onChangeText={text => passwordHandler(text)} defaultValue={password} />
                    {passwordError ? <Text style={styles.error}>{passwordErrorValue}</Text> : null}
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={cPasswordError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="Confirm Password" placeholderTextColor={cPasswordError ? "red" : "#ccc"} secureTextEntry={true} onChangeText={text => cpasswordHandler(text)} defaultValue={cPassword} />
                    {cPasswordError ? <Text style={styles.error}>{cPasswordErrorValue}</Text> : null}
                    <TouchableOpacity onPress={verify}>
                        <Text style={styles.signInBtn}>Reset</Text>
                    </TouchableOpacity>
                </View> : null }
                {displayTranslate2 ? 
                <SuccessPopUp status={displayTranslate2} message={successPopUpMsg} nav={navigation} /> : null }
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={{...styles.backgroundImage2, marginTop:displayTranslate2 ? Dimensions.get('window').height-595:0}} />
            </ScrollView>
            <Loader status={showLoader} />
            <Toaster message={showToasterMsg} status={showToaster} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
        </View>
    )
}

export default ResetPasswordScreen
