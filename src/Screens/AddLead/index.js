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

const AddLeadScreen = ({ navigation }) => {

    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch();

    const [leadSource, setLeadSource] = useState("")
    const [leadSourceErrorValue, setLeadSourceErrorValue] = useState("")
    const [leadSourceError, setLeadSourceError] = useState(false)
    const [name, setName] = useState("")
    const [nameErrorValue, setNameErrorValue] = useState("")
    const [nameError, setNameError] = useState(false)
    const [phone, setPhone] = useState("")
    const [phoneErrorValue, setPhoneErrorValue] = useState("")
    const [phoneError, setPhoneError] = useState(false)
    const [email, setEmail] = useState("")
    const [emailErrorValue, setEmailErrorValue] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [job, setJob] = useState("")
    const [jobErrorValue, setJobErrorValue] = useState("")
    const [jobError, setJobError] = useState(false)
    const [extraInfo, setExtraInfo] = useState("")
    const [extraInfoErrorValue, setExtraInfoErrorValue] = useState("")
    const [extraInfoError, setExtraInfoError] = useState(false)

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    const leadSourceHandler = (text) => {
        setLeadSource(text);
        if (text == '') {
            setLeadSourceError(false)
            setLeadSourceErrorValue('')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setLeadSourceError(true)
            setLeadSourceErrorValue('Please enter a valid lead source')
            return;
        } else {
            setLeadSourceError(false)
            setLeadSourceErrorValue('')
        }
    }
    const nameHandler = (text) => {
        setName(text);
        if (text == '') {
            setNameError(true)
            setNameErrorValue('Please enter a name')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setNameError(true)
            setNameErrorValue('Please enter a valid name')
            return;
        } else {
            setNameError(false)
            setNameErrorValue('')
        }
    }
    const phoneHandler = (text) => {
        setPhone(text);
        if (text == '') {
            setPhoneError(true)
            setPhoneErrorValue('Please enter a phone')
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
    const jobHandler = (text) => {
        setJob(text);
        if (text == '') {
            setJobError(false)
            setJobErrorValue('')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setJobError(true)
            setJobErrorValue('Please enter a valid lead source')
            return;
        } else {
            setJobError(false)
            setJobErrorValue('')
        }
    }

    const extraInfoHandler = (text) => {
        setExtraInfo(text);
        if (text == '') {
            setExtraInfoError(false)
            setExtraInfoErrorValue('')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setExtraInfoError(true)
            setExtraInfoErrorValue('Please enter a valid extra information')
            return;
        } else {
            setExtraInfoError(false)
            setExtraInfoErrorValue('')
        }
    }

    const createMessage = async () => {

        Keyboard.dismiss()

        if (name == '') {
            setNameError(true)
            setNameErrorValue('Please enter a name')
            return;
        }else{
            setNameError(false)
            setNameErrorValue('')
        }

        if (phone == '') {
            setPhoneError(true)
            setPhoneErrorValue('Please enter a phone')
            return;
        }else{
            setPhoneError(false)
            setPhoneErrorValue('')
        }

        if (email == '') {
            setEmailError(true)
            setEmailErrorValue('Please enter a email')
            return;
        }else{
            setEmailError(false)
            setEmailErrorValue('')
        }


        if (leadSourceError || nameError || phoneError || emailError || jobError || extraInfoError) {
            return;
        } else {
            setShowLoader(true)
            getTokens();
            try {
                const leads = [{leadSource, name, phone, email, job,  extraInfo}]
                const response = await axios.post('/leads/create', { leads }, {
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

    const getTokens = async () => {
        if (rToken !== null || rToken !== undefined) {
            const response = await axios.get('/refresh-token', {
                headers: {
                    'refreshtoken': rToken,
                },
            });
            if (response?.data?.message) {
                storeDataAsync("accessToken", response?.data.accessToken);
                storeDataAsync("refreshToken", response?.data.refreshToken);
                dispatch(login(response?.data.accessToken));
                dispatch(setRefreshToken(response?.data.refreshToken));
            }

            if (response?.data?.error) {
                // console.log(response?.data?.error);
                await AsyncStorage.removeItem('accessToken')
                await AsyncStorage.removeItem('refreshToken')
                dispatch(logout());
                dispatch(removeRefreshToken());
            }
        } else {
            await AsyncStorage.removeItem('accessToken')
            await AsyncStorage.removeItem('refreshToken')
            dispatch(logout());
            dispatch(removeRefreshToken());
            return;
        }
    }

    const storeDataAsync = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            // saving error
            console.log(e);
        }
    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <ScrollView style={styles.topContainer}>

                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Lead Source</Text>
                        {leadSourceError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{leadSourceErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter lead source" style={styles.input} placeholderTextColor={leadSourceError ? "red" : "#ccc"} onChangeText={text => leadSourceHandler(text)} defaultValue={leadSource} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Name</Text>
                        {nameError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{nameErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter name" style={styles.input} placeholderTextColor={nameError ? "red" : "#ccc"} onChangeText={text => nameHandler(text)} defaultValue={name} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Phone</Text>
                        {phoneError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{phoneErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter phone" style={styles.input} placeholderTextColor={phoneError ? "red" : "#ccc"} onChangeText={text => phoneHandler(text)} defaultValue={phone} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Email</Text>
                        {emailError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{emailErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter email" style={styles.input} placeholderTextColor={emailError ? "red" : "#ccc"} onChangeText={text => emailHandler(text)} defaultValue={email} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Job</Text>
                        {jobError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{jobErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter job" style={styles.input} placeholderTextColor={jobError ? "red" : "#ccc"} onChangeText={text => jobHandler(text)} defaultValue={job} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Extra information</Text>
                        {extraInfoError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{extraInfoErrorValue}</Text> : null}
                        <View style={styles.inputTextAreaContainer}>
                            <TextInput placeholder="Enter extra information" style={styles.textArea} multiline={true} numberOfLines={4} placeholderTextColor={extraInfoError ? "red" : "#ccc"} onChangeText={text => extraInfoHandler(text)} defaultValue={extraInfo} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={createMessage}>
                        <Text style={styles.textStyle}>CREATE LEAD</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default AddLeadScreen
