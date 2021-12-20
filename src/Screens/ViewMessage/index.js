import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomMaskPopUp from '../../Components/BottomMaskPopUp';
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import axios from "../../../axios"
import Markdown from 'react-native-simple-markdown'

const ViewMessageScreen = ({ route,navigation }) => {

    const refRBSheet = useRef();
    const {id,name,description} = route.params;

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const reload = useSelector(selectReload)

    const [title, setTitle] = useState(name)
    const [message, setMessage] = useState(description)
    const [image, setImage] = useState("")

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")
    
    const EditMessageHandler = () => {
        refRBSheet.current.close();
        navigation.navigate('EditMessage',{
            id,name:title,description:message
        })
    }

    const DeleteMessageHandler = async () => {
        refRBSheet.current.close();
        setShowLoader(true)
        try {
            const response = await axios.delete(`/content-message/delete/${id}`, {
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
        loadMessageData();
    }, [id, reload])

    const loadMessageData = async () => {
        setShowLoader(true)
        try {
            const resp = await axios.get(`/content-message/view/${id}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setTitle(resp?.data?.contentMessage?.title)
                setMessage(resp?.data?.contentMessage?.message)
                setImage(resp?.data?.contentMessage?.image)
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
            searchText:"Search clients & phonebook", sendItemType:"content-message",itemId:id
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

                        <View style={styles.detailContainer}>
                            <Text style={styles.detailHeaderText}>MESSAGE TEMPLATE</Text>
                            <Image source={{uri:`http://156.67.217.238:8080/uploads/${image}`}} style={styles.pdfImage} />
                            <Text style={styles.detailText}><Markdown>{message}</Markdown></Text>
                        </View>

                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomButton} onPress={sendClientHandler}>
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
                        <Text style={styles.optionsText}>Edit Message Template</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => DeleteMessageHandler()} style={styles.optionsContainer}>
                        <MaterialIcons name="delete" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Delete Message Template</Text>
                    </TouchableOpacity>
                </View>
            </BottomMaskPopUp>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </SafeAreaView>
    )
}

export default ViewMessageScreen
