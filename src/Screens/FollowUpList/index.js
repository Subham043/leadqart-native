import React, { useRef, useState, useEffect } from 'react'
import { RefreshControl, View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AllCLientCard from '../../Components/AllCLientCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'

const FollowUpListScreen = ({ route, navigation }) => {

    const { followUpName, loadData } = route.params;
    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);
    const [array, setArray] = React.useState([]);
    const [leadData, setLeadData] = React.useState([]);

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setLoadng(true)
        setLeadData([])
        getLeads();
    }, []);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setLoadng(true)
            setLeadData([])
            getLeads();
        }
        return () => mounted = false;
    }, [])

    const getLeads = async () => {
        try {
            const resp = await axios.get(`/follow-up/${loadData}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setLeadData([...resp?.data?.followup])
                setLoadng(false)
                setRefreshing(false)
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
    }

    return (
        <SafeAreaView style={{ ...styles.mainContainer, paddingTop: SBar.currentHeight }}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <View style={styles.layerContainer}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                        <MaterialIcons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.backButtonText}>{followUpName}</Text>
                </View>
            </View>
            <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {loading ? <AllClientCardPlaceholder /> : null}
                {leadData.map((item, index) => {
                    return (<AllCLientCard navigation={navigation} item={item.lead} key={index} />);
                })}
            </ScrollView>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </SafeAreaView>
    )
}

export default FollowUpListScreen
