import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AccountScreenButton from '../../Components/AccountScreenButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "../../../axios"
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "../../../app/feature/userSlice"
import { setRefreshToken, removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import Loader from '../../Components/Loader'
import { useIsFocused } from "@react-navigation/native";


const AccountScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const isFocused = useIsFocused();

    const [name, setName] = useState(null)
    const [email, setEmail] = useState("")
    const [emailShort, setEmailShort] = useState("")

    const [showLoader, setShowLoader] = useState(false)

    const logoutHandler = async() => {
        await AsyncStorage.removeItem('refreshToken')
        dispatch(logout());
        dispatch(removeRefreshToken());
    }

    useEffect(() => {
        loadProfile()
    }, [isFocused])

    const loadProfile = async () => {
        setShowLoader(true)
        try {
            const resp = await axios.get(`/profile`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            
            if (resp?.data?.message) {
                setName(resp?.data?.user?.name!=null? resp?.data?.user?.name : null);
                setEmail(resp?.data?.user?.email)
                setEmailShort(resp?.data?.user?.email!=null ? (resp?.data?.user?.email).match(/^([^@]*)@/)[1] : "")
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
    

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <TouchableOpacity style={styles.accountContainer} onPress={()=>navigation.navigate('Profile')}>
                <View style={styles.leftContainer}>
                    <View style={styles.leftIconContainer}>
                        <FontAwesome5 name="user-alt" size={25} color="#fff" />
                    </View>
                    <View style={styles.leftTextContainer}>
                        <Text style={styles.nameHeading} numberOfLines={1}>{name!=null?name:emailShort}</Text>
                        <Text style={styles.emailText} numberOfLines={1}>{email}</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.rightInnerIconContainer}>
                        <AntDesign name="right" size={15} color="black" />
                    </View>
                </View>
            </TouchableOpacity>
            <View style={styles.PreferenceMainContainer}>
                <View style={styles.HeaderContainer}>
                    <Text style={styles.HeaderText}>Account Preferences</Text>
                </View>
                {/* <AccountScreenButton leftText="Settings" /> */}
                <AccountScreenButton leftText="Integrations" link="Integration" navigation={navigation} />
                {/* <AccountScreenButton leftText="Subscription" rightText="ACTIVE" /> */}
            </View>
            {/* <View style={styles.PreferenceMainContainer}>
                <View style={styles.HeaderContainer}>
                    <Text style={styles.HeaderText}>Customer Support</Text>
                </View>
                <AccountScreenButton leftText="User Guide" />
                <AccountScreenButton leftText="Contact Us" />
            </View> */}
            <View style={styles.PreferenceMainContainer}>
                <TouchableOpacity style={styles.logoutContainer} onPress={() => logoutHandler()}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <Loader status={showLoader} />
        </SafeAreaView>
    )
}

export default AccountScreen