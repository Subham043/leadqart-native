import React from 'react'
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

const AccountScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const logoutHandler = async() => {
        await AsyncStorage.removeItem('refreshToken')
        dispatch(logout());
        dispatch(removeRefreshToken());
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <TouchableOpacity style={styles.accountContainer}>
                <View style={styles.leftContainer}>
                    <View style={styles.leftIconContainer}>
                        <FontAwesome5 name="user-alt" size={25} color="#fff" />
                    </View>
                    <View style={styles.leftTextContainer}>
                        <Text style={styles.nameHeading}>Parabola</Text>
                        <Text style={styles.emailText}>parabola5ine@gmail.com</Text>
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
                <AccountScreenButton leftText="Settings" />
                <AccountScreenButton leftText="Integrations" />
                <AccountScreenButton leftText="Subscription" rightText="ACTIVE" />
            </View>
            <View style={styles.PreferenceMainContainer}>
                <View style={styles.HeaderContainer}>
                    <Text style={styles.HeaderText}>Customer Support</Text>
                </View>
                <AccountScreenButton leftText="User Guide" />
                <AccountScreenButton leftText="Contact Us" />
            </View>
            <View style={styles.PreferenceMainContainer}>
                <TouchableOpacity style={styles.logoutContainer} onPress={() => logoutHandler()}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AccountScreen