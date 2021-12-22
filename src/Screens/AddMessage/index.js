import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Keyboard, Pressable } from 'react-native';
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
import * as DocumentPicker from 'expo-document-picker';
import { MarkdownEditor } from 'react-native-markdown-editor';

const AddMessageScreen = ({ navigation }) => {

    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch();

    const [title, setTitle] = useState("")
    const [titleErrorValue, setTitleErrorValue] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [message, setMessage] = useState("")
    const [messageErrorValue, setMessageErrorValue] = useState("")
    const [messageError, setMessageError] = useState(false)

    const [image, setImage] = useState("")
    const [filename, setFilename] = useState("Select a image file")
    const [filetype, setFiletype] = useState("")
    const [imageErrorValue, setImageErrorValue] = useState("")
    const [imageError, setImageError] = useState(false)

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
        } else {
            setMessageError(false)
            setMessageErrorValue('')
        }
    }

    const _pickDocument = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync({});
            if (file.type === 'cancel') {
                setImageError(true)
                setImageErrorValue('Please select an image')
                return;
            }

            // if (file.mimeType == 'application/pdf' || file.mimeType == 'application/pdf' || file.mimeType == 'application/pdf') {
            //     setImageError(true)
            //     setImageErrorValue('Please select an image')
            //     return;
            // }
            switch (file.mimeType) {
                case 'image/png':
                    break;
                case 'image/jpg':
                    break;
                case 'image/jpeg':
                    break;

                default:
                    setImageError(true)
                    setImageErrorValue('Please select an image')
                    return;
                    break;
            }

            setImageError(false)
            setImageErrorValue('')
            setFilename(file.name);
            setFiletype(file.mimeType);
            setImage(Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''));
        } catch (error) {
            console.log(error);
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

        if (image == '') {
            setImageError(true)
            setImageErrorValue('Please select a image')
            return;
        } else {
            setImageError(false)
            setImageErrorValue('')
        }

        if (titleError || messageError || imageError) {
            return;
        } else {
            setShowLoader(true)
            getTokens();
            try {
                const data = new FormData();
                let fileData = {
                    uri: image,
                    type: filetype,
                    name: filename
                };
                data.append('image', fileData);
                data.append('title', title);
                data.append('message', message);
                const response = await axios.post('/content-message/create', data, {
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

                if (response?.data?.errors?.title) {
                    setTitleError(true)
                    setTitleErrorValue(response?.data?.errors?.title?.msg)
                }

                if (response?.data?.errors?.message) {
                    setMessageError(true)
                    setMessageErrorValue(response?.data?.errors?.message?.msg)
                }

                if (response?.data?.errors?.image) {
                    setImageError(true)
                    setImageErrorValue(response?.data?.errors?.image?.msg)
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
                        <Text style={styles.label}>Image</Text>
                        {imageError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{imageErrorValue}</Text> : null}
                        <Pressable onPress={() => _pickDocument()} style={styles.inputFileContainer}>
                            <Text style={styles.inputText}>{filename}</Text>
                            <Text style={styles.uploadText}>UPLOAD</Text>
                        </Pressable>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Message Template</Text>
                        {messageError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{messageErrorValue}</Text> : null}
                        <View style={styles.inputTextAreaContainer}>
                        <MarkdownEditor onMarkdownChange={text => messageHandler(text)} style={{width:'100%'}} />
                            {/* <TextInput placeholder="Enter message template" style={styles.textArea} multiline={true} numberOfLines={4} placeholderTextColor={messageError ? "red" : "#ccc"} onChangeText={text => messageHandler(text)} value={messsage}  /> */}
                            
                            
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={createMessage}>
                        <Text style={styles.textStyle}>CREATE MESSAGE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default AddMessageScreen
