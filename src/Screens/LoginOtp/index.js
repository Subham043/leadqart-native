import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ImageBackground, Image,  Text, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import styles from './styles'
import axios from "../../../axios"
import Loader from '../../Components/Loader'
import Toaster from '../../Components/Toaster'
import ErrorToaster from '../../Components/ErrorToaster'
import SuccessPopUp from '../../Components/SuccessPopUp'
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "../../../app/feature/userSlice"
import { setRefreshToken, removeRefreshToken, selectRefreshToken } from "../../../app/feature/refreshTokenSlice"
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginOtpScreen = ({ route, navigation }) => {

    const dispatch = useDispatch();

    const [displayTranslate, setDisplayTranslate] = useState(true)
    const [displayTranslate2, setDisplayTranslate2] = useState(false)
    const [successPopUpMsg, setSuccessPopUpMsg] = useState("")

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
    const [showErrorToaster, setShowErrorToaster] = useState("")
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")

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
            return ;
        } else {
            setShowLoader(true)
            try {
                const response = await axios.post(`/login-verify/${id}`, { otp },);
                setShowLoader(false)

                if(response?.data?.message){
                    // setSuccessPopUpMsg(response?.data?.message)
                    // setDisplayTranslate(false)
                    // setDisplayTranslate2(true)
                    storeDataAsync("accessToken",response?.data.accessToken);
                    storeDataAsync("refreshToken",response?.data.refreshToken);
                    dispatch(setRefreshToken(response?.data.refreshToken));
                    dispatch(login(response?.data.accessToken));
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

                if (response?.data?.errors?.otp) {
                    setOtpError(true)
                    setOtpErrorValue(response?.data?.errors?.otp.msg)
                }

            } catch (error) {
                setShowLoader(false)
                console.log(error.response.data);
                
            }
        }



    }

    const storeDataAsync = async (key,value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
          // saving error
          console.log(e);
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
                {displayTranslate ?
                <View style={styles.formContainer}>
                    <Text style={styles.label}>OTP</Text>
                    <TextInput style={otpError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="OTP" placeholderTextColor={otpError ? "red" : "#ccc"} secureTextEntry={true} onChangeText={text => otpHandler(text)} defaultValue={otp} />
                    {otpError ? <Text style={styles.error}>{otpErrorValue}</Text> : null}
                    <TouchableOpacity onPress={verify}>
                        <Text style={styles.signInBtn}>Submit</Text>
                    </TouchableOpacity>
                </View> : null }
                {displayTranslate2 ? 
                <SuccessPopUp status={displayTranslate2} message={successPopUpMsg} nav={navigation} /> : null }
                <ImageBackground source={require('../../../assets/images/blue-waves.png')} style={{...styles.backgroundImage2, marginTop:displayTranslate2 ? Dimensions.get('window').height-595:Dimensions.get('window').height-680}} />
            </ScrollView>
            <Loader status={showLoader} />
            <Toaster message={showToasterMsg} status={showToaster} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
        </View>
    )
}

export default LoginOtpScreen
