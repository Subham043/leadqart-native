import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomMaskPopUp from '../../Components/BottomMaskPopUp';
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import axios from "../../../axios"
import * as Linking from 'expo-linking';
import qs from 'qs';

const SendMessageScreen = ({ route,navigation }) => {

    const refRBSheet = useRef();
    const {messageId,userId} = route.params;

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const reload = useSelector(selectReload)

    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [leadDetail, setLeadDetail] = React.useState({});

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")
    

    useEffect(() => {
        loadMessageData();
        loadLeadData();
    }, [messageId, userId, reload])

    const loadMessageData = async () => {
        setShowLoader(true)
        try {
            const resp = await axios.get(`/content-message/view/${messageId}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setTitle(resp?.data?.contentMessage?.title)
                setMessage(resp?.data?.contentMessage?.message)
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

    const loadLeadData = async () => {
        setShowLoader(true)
        try {
            const resp = await axios.get(`/leads/view/${userId}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setLeadDetail(resp?.data?.leads)
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

    const sendMessageHandler = async (messageType) => {
        if(messageType==='Whatsapp'){
            Linking.openURL(`whatsapp://send?text=${message}&phone=+91${leadDetail.phone}`)
        }else if(messageType==='Message'){
            let url = `sms:${leadDetail.phone}`;
            let query = qs.stringify({
                body: message,
            });
            if (query.length) {
                Platform.OS === 'android' ? url += `?${query}` : url += `&${query}`;
            }
            let canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                Linking.openURL(url)
            }
        }else if(messageType==='Email'){
            let url = `mailto:${leadDetail.email}`;
            let query = qs.stringify({
                body: message,
            });
            if (query.length) {
                url += `?${query}`;
            }
            let canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                Linking.openURL(url)
            }
        }
        refRBSheet.current.close();
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
                </View>
                <View style={styles.middleContainer}>
                    <ScrollView>

                        <View style={styles.sendDetailContainer}>
                            <Text style={styles.detailText}>Sending to <Text style={styles.sendNameText}>{leadDetail.name}</Text></Text>
                        </View>

                        <View style={styles.detailContainer}>
                            <Text style={styles.detailHeaderText}>MESSAGE TEMPLATE</Text>
                            <Text style={styles.detailText}>{message}</Text>
                        </View>

                    </ScrollView>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.bottomFirstButton} onPress={() => refRBSheet.current.open()}>
                        <FontAwesome5 name="share-alt" size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton} onPress={() => sendMessageHandler('Whatsapp')}>
                        <Text style={styles.bottomButtonText}>SEND VIA WHATSAPP</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <BottomMaskPopUp refRBSheet={refRBSheet} height={200}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Other sending options</Text>
                    </View>
                    <TouchableOpacity onPress={() => sendMessageHandler('Message')} style={styles.optionsContainer}>
                        <Entypo name="message" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>SMS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => sendMessageHandler('Email')} style={styles.optionsContainer}>
                        <MaterialIcons name="email" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </BottomMaskPopUp>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </SafeAreaView>
    )
}

export default SendMessageScreen
