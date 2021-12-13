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
import Entypo from 'react-native-vector-icons/Entypo';

const FacebookConfigurationScreen = ({ navigation }) => {

    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const dispatch = useDispatch();

    const [facebookPagesList, setFacebookPagesList] = useState([])

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    useEffect(() => {
        recieveFacebookTokenDetails()
        // recieveFacebookPageDetails()
    }, [])

    const recieveFacebookTokenDetails = async () => {
        setShowLoader(true)
        try {
            const response = await axios.get('/facebook/token/detail', {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            const resp = await recieveFacebookPageDetails(response.data.facebookDetails.fbId, response.data.facebookDetails.token)
            // console.log(resp);
            setFacebookPagesList(resp.response)
        } catch (error) {
            console.log(error);
        }
        setShowLoader(false)
    }

    const recieveFacebookPageDetails = async (fbId, token) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`/facebook/pages/${fbId}/${token}`, {
                    headers: {
                        'authorization': 'bearer ' + user,
                    },
                });
                resolve(response.data);
            } catch (error) {
                console.log(error);
                reject(error);
            }
        })

    }

    const subscribe = async (id,token,name,ind) => {

        Keyboard.dismiss()
        setShowLoader(true)
        try {
            const response = await axios.get(`/facebook/pages/subscribe/${id}/${token}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            // console.log(response);
            if (response?.data?.response.success==true) {
                // console.log(response?.data?.message);
                setShowToasterMsg(`${name} subscribed to leadqart successfully`)
                setShowToaster(true)
                setTimeout(() => {
                    setShowToaster(false)
                    dispatch(setReload(true));
                }, 1000);
                let removedFacebookPagesList = facebookPagesList.filter((item,index) => index !==ind)
                setFacebookPagesList(removedFacebookPagesList)
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

            if (response?.data?.errors?.message) {
                setMessageError(true)
                setMessageErrorValue(response?.data?.errors?.message?.msg)
            }
        } catch (error) {
            console.log(error);
        }
        setShowLoader(false)

    }
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <ScrollView style={styles.topContainer}>

                    <View style={styles.inputGroupContainer}>
                        <Text style={styles.label}>Subscribe Your Facebook Pages To Leadqart To Recieve Leads.</Text>
                        {facebookPagesList.map((item, index) => {
                            return (
                                <View style={styles.inputContainer} key={index}>
                                    <View style={styles.iconTextContainer}>
                                        <Entypo name="facebook" size={35} color="#4267B2" />
                                        <Text style={styles.FbPageName}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.subscribeContainer} onPress={() =>subscribe(item.id,item.access_token,item.name,index)}>
                                        <Text style={styles.subscribe}>SUBSCRIBE</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                        }

                    </View>
                </ScrollView>

            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </View>
    )
}

export default FacebookConfigurationScreen
