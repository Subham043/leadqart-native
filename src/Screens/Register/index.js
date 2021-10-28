import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, ScrollView, ImageBackground, Image, ActivityIndicator, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './registerStyles'
import axios from "../../../axios"
import Loader from '../../Components/Loader'
import Toaster from '../../Components/Toaster'
import ErrorToaster from '../../Components/ErrorToaster'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState("")
    const [nameErrorValue, setNameErrorValue] = useState("")
    const [nameError, setNameError] = useState(false)
    const [email, setEmail] = useState("")
    const [emailErrorValue, setEmailErrorValue] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [phone, setPhone] = useState("")
    const [phoneErrorValue, setPhoneErrorValue] = useState("")
    const [phoneError, setPhoneError] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordErrorValue, setPasswordErrorValue] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [cPassword, setCPassword] = useState("")
    const [cPasswordErrorValue, setCPasswordErrorValue] = useState("")
    const [cPasswordError, setCPasswordError] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")

    const nameHandler = (text) => {
        setName(text);
        if (text == '') {
            setNameError(true)
            setNameErrorValue('Please enter your name')
            return;
        } else if (!(/^[a-zA-Z\s]*$/.test(text))) {
            setNameError(true)
            setNameErrorValue('Please enter a valid name')
            return;
        } else {
            setNameError(false)
            setNameErrorValue('')
        }
    }

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

    const phoneHandler = (text) => {
        setPhone(text);
        if (text == '') {
            setPhoneError(true)
            setPhoneErrorValue('Please enter your phone')
            return;
        } else if (!(/^[0-9\s]*$/.test(text)) || text.length > 10 || text.length < 10) {
            setPhoneError(true)
            setPhoneErrorValue('Please enter a valid phone')
            return;
        } else {
            setPhoneError(false)
            setPhoneErrorValue('')
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

    const signIn = async () => {
        if (name == '') {
            setNameError(true)
            setNameErrorValue('Please enter your name')
            return;
        } else {
            setNameError(false)
            setNameErrorValue('')
        }

        if (email == '') {
            setEmailError(true)
            setEmailErrorValue('Please enter your email')
            return;
        } else {
            setEmailError(false)
            setEmailErrorValue('')
        }

        if (phone == '') {
            setPhoneError(true)
            setPhoneErrorValue('Please enter your phone')
            return;
        } else {
            setPhoneError(false)
            setPhoneErrorValue('')
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

        if (nameError || emailError || phoneError || passwordError || cPasswordError) {
            return ;
        } else {
            setShowLoader(true)
            try {
                const response = await axios.post('/register', { name, email, phone, password, cpassword: cPassword },);
                setShowLoader(false)
                if(response?.data?.message){
                    setShowToasterMsg(response?.data?.message)
                    setShowToaster(true)
                    setTimeout(() => {
                        setShowToaster(false)
                    }, 1000);
                    navigation.navigate('OTP', {
                        id: response.data.id,
                        msg: response.data.message,
                      });
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

                if (response?.data?.errors?.name) {
                    setNameError(true)
                    setNameErrorValue(response?.data?.errors?.name?.msg)
                }

                if (response?.data?.errors?.phone) {
                    setPhoneError(true)
                    setPhoneErrorValue(response?.data?.errors?.phone?.msg)
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
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={nameError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="Name" placeholderTextColor={nameError ? "red" : "#ccc"} onChangeText={text => nameHandler(text)} defaultValue={name} />
                    {nameError ? <Text style={styles.error}>{nameErrorValue}</Text> : null}
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={emailError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="Email" placeholderTextColor={emailError ? "red" : "#ccc"} onChangeText={text => emailHandler(text)} defaultValue={email} />
                    {emailError ? <Text style={styles.error}>{emailErrorValue}</Text> : null}
                    <Text style={styles.label}>Phone</Text>
                    <TextInput style={phoneError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="Phone" placeholderTextColor={phoneError ? "red" : "#ccc"} onChangeText={text => phoneHandler(text)} defaultValue={phone} />
                    {phoneError ? <Text style={styles.error}>{phoneErrorValue}</Text> : null}
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={passwordError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="Password" placeholderTextColor={passwordError ? "red" : "#ccc"} secureTextEntry={true} onChangeText={text => passwordHandler(text)} defaultValue={password} />
                    {passwordError ? <Text style={styles.error}>{passwordErrorValue}</Text> : null}
                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput style={cPasswordError ? { ...styles.input, borderColor: 'red', color: 'red' } : styles.input} placeholder="Confirm Password" placeholderTextColor={cPasswordError ? "red" : "#ccc"} secureTextEntry={true} onChangeText={text => cpasswordHandler(text)} defaultValue={cPassword} />
                    {cPasswordError ? <Text style={styles.error}>{cPasswordErrorValue}</Text> : null}
                    <TouchableOpacity onPress={signIn}>
                        <Text style={styles.signInBtn}>Sign in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                        <Text style={styles.signUpBtn}>Already a member,<Text style={styles.signUpBtnTxt}> Sign In</Text></Text>
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

export default RegisterScreen
