import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Keyboard, } from 'react-native';
import styles from './styles'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { login, logout, selectUser } from "../../../app/feature/userSlice"
import { setRefreshToken, removeRefreshToken, selectRefreshToken } from "../../../app/feature/refreshTokenSlice"
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux"
import Toaster from '../../Components/Toaster'

const InviteUserScreen = ({ navigation }) => {

    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")
    const [emailErrorValue, setEmailErrorValue] = useState("")
    const [emailError, setEmailError] = useState(false)

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")


    const emailHandler = (text) => {
        setEmail(text);
        if (text == '') {
            setEmailError(true)
            setEmailErrorValue('Please enter a valid email')
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

    const createMessage = async () => {

        Keyboard.dismiss()

        if (email == '') {
            setEmailError(true)
            setEmailErrorValue('Please enter a email')
            return;
        }else{
            setEmailError(false)
            setEmailErrorValue('')
        }


        if (emailError) {
            return;
        } else {
            setShowLoader(true)
            try {
                
                const response = await axios.post('/teams/invite', { email }, {
                    headers: {
                        'authorization': 'bearer ' + user,
                    },
                });
                setShowLoader(false)
                
                if (response?.data?.message) {
                    // console.log(response?.data?.message);
                    setShowToasterMsg(response?.data?.message)
                    setShowToaster(true)
                    setTimeout(() => {
                        setShowToaster(false)
                        dispatch(setReload(true));
                        navigation.goBack()
                    }, 1000);
                }

                if (response?.data?.rateLimit) {
                    setShowErrorToasterMsg(response?.data?.rateLimit)
                    setShowErrorToaster(true)
                    setTimeout(() => {
                        setShowErrorToaster(false)
                    }, 1000);
                }

                if (response?.data?.error) {
                    if (response?.data?.error === "Unauthorised") {
                        storeDataAsync("accessToken", response?.data.accessToken);
                        storeDataAsync("refreshToken", response?.data.refreshToken);
                        dispatch(login(response?.data.accessToken));
                        dispatch(setRefreshToken(response?.data.refreshToken));
                        return;
                    }
                    setShowErrorToasterMsg(response?.data?.error)
                    setShowErrorToaster(true)
                    setTimeout(() => {
                        setShowErrorToaster(false)
                    }, 1000);
                }

                if (response?.data?.errors?.leadSource) {
                    setLeadSourceError(true)
                    setLeadSourceErrorValue(response?.data?.errors?.leadSource?.msg)
                }

                if (response?.data?.errors?.extraInfo) {
                    setExtraInfoError(true)
                    setExtraInfoErrorValue(response?.data?.errors?.extraInfo?.msg)
                }

            } catch (error) {
                setShowLoader(false)
                console.log(error);
            }
        }

    }


    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <ScrollView style={styles.topContainer}>

                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Email</Text>
                        {emailError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{emailErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter email" style={styles.input} placeholderTextColor={emailError ? "red" : "#ccc"} onChangeText={text => emailHandler(text)} defaultValue={email} />
                        </View>
                    </View>
                    
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={createMessage}>
                        <Text style={styles.textStyle}>INVITE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default InviteUserScreen
