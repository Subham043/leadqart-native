import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Image,  Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import styles from './styles'
import axios from "../../../axios"
import Loader from '../../Components/Loader'
import Toaster from '../../Components/Toaster'

const OtpScreen = ({ route, navigation }) => {

    const { id, msg } = route.params;

    useEffect(() => {
        if(id === undefined || id === null || msg === undefined || msg === null){
            navigation.navigate('Home');
        }else{
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

    const [otp, setOtp] = useState("")
    const [otpErrorValue, setOtpErrorValue] = useState("")
    const [otpError, setOtpError] = useState(false)

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

    const verify = async () => {

        if (otp == '') {
            setOtpError(true)
            setOtpErrorValue('Please enter your otp')
            return;
        } else {
            setOtpError(false)
            setOtpErrorValue('')
        }

        if (otpError) {
            console.log('error')
        } else {
            setShowLoader(true)
            try {
                const response = await axios.post(`/verify/${id}`, { otp },);
                setShowLoader(false)
                setShowToasterMsg(response.data.message)
                console.log(response.data.error)
                setShowToaster(true)
                setTimeout(() => {
                    setShowToaster(false)
                }, 1000);
                // navigation.navigate('OTP', {
                //     id: response.data.message,
                //     msg: response.data.message,
                //   });
                console.log(response);
            } catch (error) {
                setShowLoader(false)
                console.log(error.response.data);
                
            }
        }



    }

    return (
        <View style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <ScrollView style={{flex:1,width:'100%'}}>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage} />
                <View style={styles.innerContainer}>
                    <Image source={require('../../../assets/images/logo.png')} style={styles.logoImage} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>OTP</Text>
                    <TextInput style={otpError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="OTP" placeholderTextColor={otpError ? "red" : "#ccc"} secureTextEntry={true} onChangeText={text => otpHandler(text)} defaultValue={otp} />
                    {otpError ? <Text style={styles.error}>{otpErrorValue}</Text> : null}
                    <TouchableOpacity onPress={verify}>
                        <Text style={styles.signInBtn}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={styles.backgroundImage2} />
            </ScrollView>
            <Loader status={showLoader} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default OtpScreen
