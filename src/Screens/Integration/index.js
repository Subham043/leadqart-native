import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import * as Facebook from 'expo-facebook';
import axios from "../../../axios"
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import * as Google from 'expo-google-app-auth';
import * as Expo from 'expo';
import Toaster from '../../Components/Toaster'

const IntegrationScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    async function facebookLogIn() {
        setShowLoader(true)
        try {
            await Facebook.initializeAsync({
                appId: '455099129250811',
            });
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'leads_retrieval', 'pages_manage_ads'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${token}`);
                const resp = await response.json();
                try {
                    const storeResponse = await storeFacebookDetails(token,resp.id,resp.name);
                    navigation.navigate('FacebookConfiguration')
                    // console.log(storeResponse);
                } catch (error) {
                    setShowErrorToasterMsg("Something went wrong. Please try again!")
                    setShowErrorToaster(true)
                    setTimeout(() => {
                        setShowErrorToaster(false)
                    }, 1000);
                }
            } else {
                // type === 'cancel'
                setShowErrorToasterMsg("Something went wrong. Please try again!")
                setShowErrorToaster(true)
                setTimeout(() => {
                    setShowErrorToaster(false)
                }, 1000);
            }
        } catch ({ message }) {
            //   alert(`Facebook Login Error: ${message}`);
            setShowErrorToasterMsg(message)
            setShowErrorToaster(true)
            setTimeout(() => {
                setShowErrorToaster(false)
            }, 1000);
        }
        setShowLoader(false)
    }

    async function signInWithGoogleAsync() {
        try {
          const result = await Google.logInAsync({
            behavior: 'web',
            iosClientId: "550396145836-ac7a3vino7pe8ubfue04mrn26he0obp3.apps.googleusercontent.com",
            androidClientId: "550396145836-ci8njjfhjfuf3b5bgqj1j3uitmjaakql.apps.googleusercontent.com",
            scopes: ['profile', 'email', 'https://www.googleapis.com/auth/drive'],
          });
    
          if (result.type === 'success') {
            console.log(result);
            try {
                const storeResponse = await storeGoogleDetails(result.accessToken);
                console.log(storeResponse);
                if(storeResponse=="google token stored successfully"){
                    setShowToasterMsg("Configured successfully")
                    setShowToaster(true)
                    setTimeout(() => {
                        setShowToaster(false)
                    }, 1000);
                }else{
                    setShowErrorToasterMsg("Something went wrong. Please try again!")
                    setShowErrorToaster(true)
                    setTimeout(() => {
                        setShowErrorToaster(false)
                    }, 1000);
                }
            } catch (error) {
                setShowErrorToasterMsg("Something went wrong. Please try again!")
                setShowErrorToaster(true)
                setTimeout(() => {
                    setShowErrorToaster(false)
                }, 1000);
            }
          } else {
            setShowErrorToasterMsg("User cancelled configuration");
            setShowErrorToaster(true)
            setTimeout(() => {
                setShowErrorToaster(false)
            }, 1000);
            return { cancelled: true };
          }
        } catch (e) {
            setShowErrorToasterMsg("Something went wrong. Please try again!")
                    setShowErrorToaster(true)
                    setTimeout(() => {
                        setShowErrorToaster(false)
                    }, 1000);
          return { error: true };
        }
      }

    const storeFacebookDetails = (access_token, fbId, fbName) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post('/facebook/connection/app', { access_token, fbId, fbName }, {
                    headers: {
                        'authorization': 'bearer ' + user,
                    },
                });
                resolve(response.data.message);
            } catch (error) {
                reject("Something went wrong. Please try again!");
            }
        })
    }

    const storeGoogleDetails = (access_token) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post('/google/connection/app', { access_token }, {
                    headers: {
                        'authorization': 'bearer ' + user,
                    },
                });
                resolve(response.data.message);
            } catch (error) {
                reject("Something went wrong. Please try again!");
            }
        })
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <TouchableOpacity style={styles.accountContainer} onPress={facebookLogIn}>
                <View style={styles.leftContainer}>
                    <View style={styles.leftIconContainer}>
                        <EvilIcons name="sc-facebook" size={35} color="#fff" />
                    </View>
                    <View style={styles.leftTextContainer}>
                        <Text style={styles.nameHeading}>Facebook</Text>
                        <Text style={styles.emailText}>Recieve new leads from your facebook account in your leadqart account</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.rightInnerIconContainer}>
                        <Text style={styles.configureText}>Configure <AntDesign name="right" size={15} color="#ffa200" /></Text>
                    </View>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.accountContainer} onPress={signInWithGoogleAsync}>
                <View style={styles.leftContainer}>
                    <View style={styles.leftIconContainer}>
                        <AntDesign name="google" size={35} color="#fff" />
                    </View>
                    <View style={styles.leftTextContainer}>
                        <Text style={styles.nameHeading}>Google Drive</Text>
                        <Text style={styles.emailText}>Integrate google drive to import data from csv</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.rightInnerIconContainer}>
                        <Text style={styles.configureText}>Configure <AntDesign name="right" size={15} color="#ffa200" /></Text>
                    </View>
                </View>
            </TouchableOpacity> */}
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </SafeAreaView>
    )
}

export default IntegrationScreen
