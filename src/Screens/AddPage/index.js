import React, { useState, useRef } from 'react';
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


const AddPageScreen = ({ navigation }) => {

    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch();

    const [title, setTitle] = useState("")
    const [titleErrorValue, setTitleErrorValue] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [image, setImage] = useState("")
    const [filename, setFilename] = useState("Select a image file")
    const [filetype, setFiletype] = useState("")
    const [imageErrorValue, setImageErrorValue] = useState("")
    const [imageError, setImageError] = useState(false)
    const [description, setDescription] = useState("")
    const [descriptionErrorValue, setDescriptionErrorValue] = useState("")
    const [descriptionError, setDescriptionError] = useState(false)
    const [youtubeVideo, setYoutubeVideo] = useState("")
    const [youtubeVideoErrorValue, setYoutubeVideoErrorValue] = useState("")
    const [youtubeVideoError, setYoutubeVideoError] = useState(false)
    const [map, setMap] = useState("")
    const [mapErrorValue, setMapErrorValue] = useState("")
    const [mapError, setMapError] = useState(false)

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    const titleHandler = (text) => {
        setTitle(text);
        if (text == '') {
            setTitleError(true)
            setTitleErrorValue('Please enter page title')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setTitleError(true)
            setTitleErrorValue('Please enter a valid page title')
            return;
        } else {
            setTitleError(false)
            setTitleErrorValue('')
        }
    }

    const descriptionHandler = (text) => {
        setDescription(text);
        if (text == '') {
            setDescriptionError(true)
            setDescriptionErrorValue('Please enter page description')
            return;
        } 
        // else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
        //     setDescriptionError(true)
        //     setDescriptionErrorValue('Please enter a valid page description')
        //     return;
        // } 
        else {
            setDescriptionError(false)
            setDescriptionErrorValue('')
        }
    }

    const mapHandler = (text) => {
        setMap(text);
        if (text == '') {
            setMapError(true)
            setMapErrorValue('Please enter address')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setMapError(true)
            setMapErrorValue('Please enter a valid address')
            return;
        } else {
            setMapError(false)
            setMapErrorValue('')
        }
    }

    const youtubeVideoHandler = (text) => {
        setYoutubeVideo(text);
        if (text == '') {
            setYoutubeVideoError(true)
            setYoutubeVideoErrorValue('Please enter youtube video id')
            return;
        } else if (!(/^[a-z 0-9~%.:_\@\-\/\&+=,]+$/i.test(text))) {
            setYoutubeVideoError(true)
            setYoutubeVideoErrorValue('Please enter a valid youtube video id')
            return;
        } else {
            setYoutubeVideoError(false)
            setYoutubeVideoErrorValue('')
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

    const createPage = async () => {

        Keyboard.dismiss()

        if (title == '') {
            setTitleError(true)
            setTitleErrorValue('Please enter page title')
            return;
        } else {
            setTitleError(false)
            setTitleErrorValue('')
        }

        if (description == '') {
            setDescriptionError(true)
            setDescriptionErrorValue('Please enter page description')
            return;
        } else {
            setDescriptionError(false)
            setDescriptionErrorValue('')
        }

        if (youtubeVideo == '') {
            setYoutubeVideoError(true)
            setYoutubeVideoErrorValue('Please enter youtube video id')
            return;
        } else {
            setYoutubeVideoError(false)
            setYoutubeVideoErrorValue('')
        }

        if (map == '') {
            setMapError(true)
            setMapErrorValue('Please enter address')
            return;
        } else {
            setMapError(false)
            setMapErrorValue('')
        }

        if (image == '') {
            setImageError(true)
            setImageErrorValue('Please select a image')
            return;
        } else {
            setImageError(false)
            setImageErrorValue('')
        }

        if (titleError || descriptionError || mapError || youtubeVideoError || imageError) {
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
                data.append('description', description);
                data.append('map', map);
                data.append('youtubeVideo', youtubeVideo);
                const response = await axios.post('/content-page/create', data, {
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

                if (response?.data?.errors?.title) {
                    setTitleError(true)
                    setTitleErrorValue(response?.data?.errors?.title?.msg)
                }

                if (response?.data?.errors?.description) {
                    setDescriptionError(true)
                    setDescriptionErrorValue(response?.data?.errors?.description?.msg)
                }

                if (response?.data?.errors?.map) {
                    setMapError(true)
                    setMapErrorValue(response?.data?.errors?.map?.msg)
                }

                if (response?.data?.errors?.youtubeVideo) {
                    setYoutubeVideoError(true)
                    setYoutubeVideoErrorValue(response?.data?.errors?.youtubeVideo?.msg)
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
                        <Text style={styles.label}>Page Title</Text>
                        {titleError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{titleErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter page title" style={styles.input} placeholderTextColor={titleError ? "red" : "#ccc"} onChangeText={text => titleHandler(text)} defaultValue={title} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Page Description</Text>
                        {descriptionError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{descriptionErrorValue}</Text> : null}
                        <View style={styles.inputTextAreaContainer}>
                            <TextInput placeholder="Enter page description" style={styles.textArea} multiline={true} numberOfLines={4} placeholderTextColor={descriptionError ? "red" : "#ccc"} onChangeText={text => descriptionHandler(text)} defaultValue={description} />

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
                        <Text style={styles.label}>Youtube Video ID</Text>
                        {youtubeVideoError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{youtubeVideoErrorValue}</Text> : null}
                        <View style={styles.inputContainer}>
                            <TextInput placeholder="Enter youtube video id" style={styles.input} placeholderTextColor={youtubeVideoError ? "red" : "#ccc"} onChangeText={text => youtubeVideoHandler(text)} defaultValue={youtubeVideo} />
                        </View>
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Address</Text>
                        {mapError ? <Text style={{ color: 'red', paddingVertical: 10, paddingHorizontal: 10, }}>{mapErrorValue}</Text> : null}
                        <View style={styles.inputTextAreaContainerAddress}>
                            <TextInput placeholder="Enter address" style={styles.textArea} multiline={true} numberOfLines={4} placeholderTextColor={mapError ? "red" : "#ccc"} onChangeText={text => mapHandler(text)} defaultValue={map} />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveContainer}
                        onPress={createPage}>
                        <Text style={styles.textStyle}>CREATE PAGE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default AddPageScreen
