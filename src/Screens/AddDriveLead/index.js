import React, { useState, useEffect } from 'react';
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
import GDrive from "expo-google-drive-api-wrapper";
import * as FileSystem from 'expo-file-system';

const AddDriveLeadScreen = ({ navigation }) => {

    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch();

    const [token, setToken] = useState("")
    const [name, setName] = useState("")
    const [spreadsheet, setSpreadsheet] = useState("")
    const [nameErrorValue, setNameErrorValue] = useState("")
    const [nameError, setNameError] = useState(false)
    const [upload, setUpload] = useState("")
    const [filename, setFilename] = useState("Select a PDF file")
    const [filetype, setFiletype] = useState("")
    const [uploadErrorValue, setUploadErrorValue] = useState("")
    const [uploadError, setUploadError] = useState(false)

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")


    useEffect(() => {
        recieveGoogleTokenDetails()
    }, [])

    const recieveGoogleTokenDetails = async () => {
        setShowLoader(true)
        try {
            const response = await axios.get('/google/token/detail', {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if(response.data.message == "Google token details recieved successfully"){
                setToken(response.data.googleDetails.token);
                await GDrive.setAccessToken(response.data.googleDetails.token);
                await GDrive.init();
                
                
            }
        } catch (error) {
            console.log(error);
        }
        setShowLoader(false)
    }

    const nameHandler = (text) => {
        setName(text);
        let matches = /\/([\w-_]{15,})\/(.*?gid=(\d+))?/.exec(text);
        if (text == '') {
            setNameError(true)
            setNameErrorValue('Please enter the csv url')
            return;
        } else if (!matches) {
            setNameError(true)
            setNameErrorValue('Please enter the valid csv url')
            return;
        } else {
            setNameError(false)
            setNameErrorValue('')
            console.log("Spreadsheet: " + matches[1]);
            setSpreadsheet(matches[1])
            console.log("Sheet: " + matches[3]);
        }
    }


    const createFile = async () => {

        Keyboard.dismiss()

        if (name == '') {
            setNameError(true)
            setNameErrorValue('Please enter file title')
            return;
        } else {
            setNameError(false)
            setNameErrorValue('')
        }

        if (nameError) {
            return;
        } else {
            setShowLoader(true)
            try {
                const queryParams = {};
                    
                await GDrive.files.get(spreadsheet, queryParams)
                .then(r => r.json()).then(resp => console.log(resp)).catch(err => console.log(err))
                // const fileUri: string = `${FileSystem.documentDirectory}${spreadsheet}`;
                await GDrive.files.download(spreadsheet, {
                    // toFile: `${RNFS.DocumentDirectoryPath}/${spreadsheet}`,
                    toFile: `${FileSystem.documentDirectory}${spreadsheet}`,
                    method: 'POST',
                    headers: { 
                      Accept: 'application/json',
                    },
                  });
                setShowLoader(false)
        //         const data = new FormData();
        //         let fileData = {
        //             uri: upload,
        //             type: filetype,
        //             name: filename
        //         };
        //         data.append('upload',fileData);
        //         data.append('name', name);
        //         const response = await axios.post('/content-file/create', data, {
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'multipart/form-data',
        //                 'authorization': 'bearer ' + user,
        //             },
        //         });
        //         setShowLoader(false)
        //         if (response?.data?.message) {
        //             setShowToasterMsg(response?.data?.message)
        //             setShowToaster(true)
        //             setTimeout(() => {
        //                 setShowToaster(false)
        //                 dispatch(setReload(true));
        //                 navigation.goBack()
        //             }, 1000);
        //         }

        //         if (response?.data?.rateLimit) {
        //             setShowErrorToasterMsg(response?.data?.rateLimit)
        //             setShowErrorToaster(true)
        //             setTimeout(() => {
        //                 setShowErrorToaster(false)
        //             }, 1000);
        //         }

        //         if (response?.data?.error) {
        //             if (response?.data?.error === "Unauthorised") {
        //                 storeDataAsync("accessToken", response?.data.accessToken);
        //                 storeDataAsync("refreshToken", response?.data.refreshToken);
        //                 dispatch(login(response?.data.accessToken));
        //                 dispatch(setRefreshToken(response?.data.refreshToken));
        //                 return;
        //             }
        //             setShowErrorToasterMsg(response?.data?.error)
        //             setShowErrorToaster(true)
        //             setTimeout(() => {
        //                 setShowErrorToaster(false)
        //             }, 1000);
        //         }

        //         if (response?.data?.errors?.name) {
        //             setNameError(true)
        //             setNameErrorValue(response?.data?.errors?.name?.msg)
        //         }

        //         if (response?.data?.errors?.upload) {
        //             setUploadError(true)
        //             setUploadErrorValue(response?.data?.errors?.upload?.msg)
        //         }

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
                        <Text style={styles.label}>Paste the csv url from your drive</Text>
                        {nameError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{nameErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput multiline={true} numberOfLines={4} placeholder="Paste the csv url from your drive" style={styles.input} placeholderTextColor={nameError ? "red" : "#ccc"} onChangeText={text => nameHandler(text)} defaultValue={name} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={createFile}>
                        <Text style={styles.textStyle}>SAVE FILE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default AddDriveLeadScreen
