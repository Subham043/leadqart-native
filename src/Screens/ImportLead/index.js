import React, { useState } from 'react';
import { Text, TouchableOpacity, View, TextInput, ScrollView, Pressable, Keyboard, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
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

const ImportLeadScreen = ({ navigation }) => {

    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch();


    const [upload, setUpload] = useState("")
    const [filename, setFilename] = useState("Please select a file")
    const [filetype, setFiletype] = useState("")
    const [uploadErrorValue, setUploadErrorValue] = useState("")
    const [uploadError, setUploadError] = useState(false)

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    const _pickDocument = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync({});
            if (file.type === 'cancel') {
                setUploadError(true)
                setUploadErrorValue('Please select a pdf')
                return;
            }

            switch (file.mimeType) {
                case 'text/comma-separated-values':
                    break;
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    break;
                case 'application/vnd.ms-excel':
                    break;
            
                default:
                    setUploadError(true)
                    // setUploadErrorValue('Please select a csv/xlsx/xlsx/xlx/excel file')
                    setUploadErrorValue(file.mimeType)
                    return;
                    break;
            }

            setUploadError(false)
            setUploadErrorValue('')
            setFilename(file.name);
            setFiletype(file.mimeType);
            setUpload(Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''));

        } catch (error) {
            console.log(error);
        }
    }

    const createFile = async () => {

        Keyboard.dismiss()

        if (upload == '') {
            setUploadError(true)
            setUploadErrorValue('Please select a csv/xlsx/xlsx/xlx/excel file')
            return;
        } else {
            setUploadError(false)
            setUploadErrorValue('')
        }

        if (uploadError) {
            return;
        } else {
            setShowLoader(true)
            try {
                const data = new FormData();
                let fileData = {
                    uri: upload,
                    type: filetype,
                    name: filename
                };
                data.append('upload',fileData);
                const response = await axios.post('/leads/create-via-excel', data, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
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

                if (response?.data?.errors?.upload) {
                    setUploadError(true)
                    setUploadErrorValue(response?.data?.errors?.upload?.msg)
                }

            } catch (error) {
                setShowLoader(false)
                console.log(error);
            }
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
                        <Text style={styles.label}>Select csv/xlsx/xlsx/xlx/excel file</Text>
                        {uploadError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{uploadErrorValue}</Text> : null}
                        <Pressable onPress={() => _pickDocument()} style={styles.inputTextAreaContainer}>
                            <Text style={styles.inputText}>{filename}</Text>
                            <Text style={styles.uploadText}>UPLOAD</Text>
                        </Pressable>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={createFile}>
                        <Text style={styles.textStyle}>IMPORT LEAD</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default ImportLeadScreen
