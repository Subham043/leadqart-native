import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomMaskPopUp from '../../Components/BottomMaskPopUp';
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import axios from "../../../axios"

const ViewPageScreen = ({ route, navigation }) => {

    const refRBSheet = useRef();
    const { id,name, description, image, } = route.params;

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const reload = useSelector(selectReload)

    const [title, setTitle] = useState(name)
    const [desc, setDesc] = useState(description)
    const [youtubeVideo, setYoutubeVideo] = useState("")
    const [map, setMap] = useState("")
    const [upload, setUpload] = useState(image)

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    const EditMessageHandler = () => {
        refRBSheet.current.close();
        navigation.navigate('EditPage', {
            id, ttl:title, desc, upload, yv:youtubeVideo, mp:map
        })
    }

    const DeleteMessageHandler = async () => {
        refRBSheet.current.close();
        setShowLoader(true)
        try {
            const response = await axios.delete(`/content-page/delete/${id}`, {
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
                    navigation.goBack();
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
                    await AsyncStorage.removeItem('accessToken')
                    await AsyncStorage.removeItem('refreshToken')
                    dispatch(logout());
                    dispatch(removeRefreshToken());
                }
                setShowErrorToasterMsg(response?.data?.error)
                setShowErrorToaster(true)
                setTimeout(() => {
                    setShowErrorToaster(false)
                }, 1000);
            }

        } catch (error) {
            setShowLoader(false)
            console.log(error);
        }
        setShowLoader(false)
    }

    useEffect(() => {
        loadFileData();
    }, [id, reload])

    const loadFileData = async () => {
        setShowLoader(true)
        try {
            const resp = await axios.get(`/content-page/view/${id}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            
            if (resp?.data?.message) {
                setTitle(resp?.data?.contentPage?.title)
                setDesc(resp?.data?.contentPage?.description)
                setUpload(resp?.data?.contentPage?.image)
                setYoutubeVideo(resp?.data?.contentPage?.youtubeVideo)
                setMap(resp?.data?.contentPage?.map)
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

    const sendClientHandler = () => {
        navigation.navigate('ClientSenderList',{
            searchText:"Search clients & phonebook", sendItemType:"content-page",itemId:id
        })
    }


    return (
        <SafeAreaView style={{ ...styles.mainContainer, paddingTop: SBar.currentHeight }}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <View style={styles.layerContainer}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                        <MaterialIcons name="arrow-back" size={25} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.backButtonText}>{title}</Text>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                        <Text style={styles.backButtonText}>Options</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.middleContainer}>
                    <ScrollView>

                        <TouchableOpacity style={styles.messageMainContainer} onPress={() => navigation.navigate('WebPage',{id})}>
                            <View style={styles.leftMainContainer}>
                                <View style={styles.pdfContainer}>
                                    <Image source={{ uri: `http://156.67.217.238:8080/uploads/${upload}` }} style={styles.pdfImage} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{title}</Text>
                                    <Text style={styles.description} numberOfLines={1}>{desc}</Text>
                                </View>
                            </View>
                            <View style={styles.rightMainContainer}>
                                <Text style={styles.previewText}>PREVIEW</Text>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomButton} onPress={() => sendClientHandler()}>
                        <Text style={styles.bottomButtonText}>SEND TO CLIENT</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomMaskPopUp refRBSheet={refRBSheet} height={200}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Options</Text>
                    </View>
                    <TouchableOpacity onPress={() => EditMessageHandler()} style={styles.optionsContainer}>
                        <AntDesign name="edit" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Edit Page</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => DeleteMessageHandler()} style={styles.optionsContainer}>
                        <MaterialIcons name="delete" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Delete Page</Text>
                    </TouchableOpacity>
                </View>
            </BottomMaskPopUp>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </SafeAreaView>
    )
}

export default ViewPageScreen