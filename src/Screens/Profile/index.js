import React, { useState, useEffect } from 'react';
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

const ProfileScreen = ({ navigation }) => {

    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [nameErrorValue, setNameErrorValue] = useState("")
    const [nameError, setNameError] = useState(false)
    const [phone, setPhone] = useState("")
    const [phoneErrorValue, setPhoneErrorValue] = useState("")
    const [phoneError, setPhoneError] = useState(false)
    const [email, setEmail] = useState("")

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    useEffect(() => {
        loadProfile()
    }, [])

    const loadProfile = async () => {
        setShowLoader(true)
        try {
            const resp = await axios.get(`/profile`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            
            if (resp?.data?.message) {
                setName(resp?.data?.user?.name!=null? resp?.data?.user?.name : "");
                setEmail(resp?.data?.user?.email)
                setPhone(resp?.data?.user?.phone!=null?(resp?.data?.user?.phone).toString():"")
            }

            if (resp?.data?.error) {
                console.log(resp?.data?.error);
                if (resp?.data?.error === "Unauthorised") {
                    await AsyncStorage.removeItem('accessToken')
                    await AsyncStorage.removeItem('refreshToken')
                    dispatch(logout());
                    dispatch(removeRefreshToken());
                    return;
                }
            }


        } catch (e) { console.log(e) }
        setShowLoader(false)
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


        if (nameError || phoneError) {
            return;
        } else {
            setShowLoader(true)
            try {
                const response = await axios.post('/profile', { name, phone }, {
                    headers: {
                        'authorization': 'bearer ' + user,
                    },
                });
                setShowLoader(false)
                if (response?.data?.message) {
                    setShowToasterMsg(response?.data?.message)
                    setShowToaster(true)
                    setTimeout(() => {
                        setShowToaster(false)
                        dispatch(setReload(true));
                        // navigation.goBack()
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

                if (response?.data?.errors?.name) {
                    setNameError(true)
                    setNameErrorValue(response?.data?.errors?.name?.msg)
                }

                if (response?.data?.errors?.phone) {
                    setPhoneError(true)
                    setPhoneErrorValue(response?.data?.errors?.phone?.msg)
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
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter email" style={styles.input} placeholderTextColor="#ccc" editable={false} selectTextOnFocus={false} defaultValue={email} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={createMessage}>
                        <Text style={styles.textStyle}>UPDATE PROFILE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default ProfileScreen
