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

const EditMessageScreen = ({ navigation, route }) => {

    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch();

    const { id, name, description } = route.params;
    
    const [title, setTitle] = useState(name)
    const [titleErrorValue, setTitleErrorValue] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [message, setMessage] = useState(description)
    const [messageErrorValue, setMessageErrorValue] = useState("")
    const [messageError, setMessageError] = useState(false)

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    const titleHandler = (text) => {
        setTitle(text);
        if (text == '') {
            setTitleError(true)
            setTitleErrorValue('Please enter message title')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setTitleError(true)
            setTitleErrorValue('Please enter a valid message title')
            return;
        } else {
            setTitleError(false)
            setTitleErrorValue('')
        }
    }

    const messageHandler = (text) => {
        setMessage(text);
        if (text == '') {
            setMessageError(true)
            setMessageErrorValue('Please enter message template')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setMessageError(true)
            setMessageErrorValue('Please enter a valid message template')
            return;
        } else {
            setMessageError(false)
            setMessageErrorValue('')
        }
    }

    const createMessage = async () => {

        Keyboard.dismiss()

        if (title == '') {
            setTitleError(true)
            setTitleErrorValue('Please enter message title')
            return;
        } else {
            setTitleError(false)
            setTitleErrorValue('')
        }

        if (message == '') {
            setMessageError(true)
            setMessageErrorValue('Please enter message template')
            return;
        } else {
            setMessageError(false)
            setMessageErrorValue('')
        }

        if (titleError || messageError) {
            return;
        } else {
            setShowLoader(true)
            getTokens();
            try {
                const response = await axios.post(`/content-message/edit/${id}`, { title, message }, {
                    headers: {
                        'authorization': 'bearer ' + user,
                    },
                });
                setShowLoader(false)
                console.log(response?.data);
                if (response?.data?.message) {
                    // console.log(response?.data?.message);
                    setShowToasterMsg(response?.data?.message)
                    setShowToaster(true)
                    setTimeout(() => {
                        setShowToaster(false)
                        dispatch(setReload(true));
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

                if (response?.data?.errors?.title) {
                    setTitleError(true)
                    setTitleErrorValue(response?.data?.errors?.title?.msg)
                }

                if (response?.data?.errors?.message) {
                    setMessageError(true)
                    setMessageErrorValue(response?.data?.errors?.message?.msg)
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
                        <Text style={styles.label}>Message Title</Text>
                        {titleError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{titleErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter message title" style={styles.input} placeholderTextColor={titleError ? "red" : "#ccc"} onChangeText={text => titleHandler(text)} defaultValue={title} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Message Template</Text>
                        {messageError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{messageErrorValue}</Text> : null}
                        <View style={styles.inputTextAreaContainer}>
                            <TextInput placeholder="Enter message template" style={styles.textArea} multiline={true} numberOfLines={4} placeholderTextColor={messageError ? "red" : "#ccc"} onChangeText={text => messageHandler(text)} defaultValue={message} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={createMessage}>
                        <Text style={styles.textStyle}>UPDATE MESSAGE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default EditMessageScreen
