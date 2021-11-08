import React, { useRef, useState, useEffect } from 'react'
import { RefreshControl, View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AllCLientCard from '../../Components/AllCLientCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'
import BottomMaskPopUp from '../../Components/BottomMaskPopUp';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "../../../app/feature/userSlice"
import { setRefreshToken, removeRefreshToken, selectRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { setReload, selectReload } from "../../../app/feature/reloadSlice"

const GroupsListScreen = ({ route, navigation }) => {

    const refRBSheet = useRef();
    const { groupName, groupId } = route.params;
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);
    const [leadData, setLeadData] = React.useState([]);
    const [groupData, setGroupData] = React.useState({});
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
        setLoadng(true)
        setLeadData([])
        getLeads();
    }, [getLeads])

    const deleteGroup = async () => {
        refRBSheet.current.close()
        setShowLoader(true)
        getTokens();
        try {
            const resp = await axios.delete(`/groups/delete/${groupId}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            setShowLoader(false)
            if (resp?.data?.message) {
                console.log(resp?.data?.message);
                setShowToasterMsg(resp?.data?.message)
                setShowToaster(true)
                setTimeout(() => {
                    setShowToaster(false)
                    dispatch(setReload(true));
                    navigation.goBack()
                }, 1000);
            }

            if (resp?.data?.rateLimit) {
                setShowErrorToasterMsg(resp?.data?.rateLimit)
                setShowErrorToaster(true)
                setTimeout(() => {
                    setShowErrorToaster(false)
                }, 1000);
            }

            if (resp?.data?.error) {
                console.log(resp?.data?.error);
                if (resp?.data?.error === "Unauthorised") {
                    storeDataAsync("accessToken", resp?.data.accessToken);
                    storeDataAsync("refreshToken", resp?.data.refreshToken);
                    dispatch(login(resp?.data.accessToken));
                    dispatch(setRefreshToken(resp?.data.refreshToken));
                    return;
                }
            }


        } catch (e) { 
            console.log(e) 
        }
    }

    const getLeads = async () => {
        getTokens();
        try {
            const resp = await axios.get(`/groups/view/${groupId}`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setGroupData({ ...resp?.data?.groups })
                setLeadData([...resp?.data?.groups.leads])
                setLoadng(false)
                setRefreshing(false)
            }

            if (resp?.data?.error) {
                console.log(resp?.data?.error);
                if (resp?.data?.error === "Unauthorised") {
                    storeDataAsync("accessToken", resp?.data.accessToken);
                    storeDataAsync("refreshToken", resp?.data.refreshToken);
                    dispatch(login(resp?.data.accessToken));
                    dispatch(setRefreshToken(resp?.data.refreshToken));
                    return;
                }
            }


        } catch (e) { console.log(e) }
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
                return;
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
        <SafeAreaView style={{ ...styles.mainContainer, paddingTop: SBar.currentHeight }}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <View style={styles.layerContainer}>
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                        <MaterialIcons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.backButtonText}>{groupName}</Text>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                        <Text style={styles.backButtonText}>Options</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder={`Search ${groupName}`} placeholderTextColor="gray" />

                        <View style={styles.searchBtn}>
                            <Octicons name="search" size={20} color="#33b9ff" />
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {loading ? <AllClientCardPlaceholder /> : null}
                {leadData.map((item, index) => {
                    return (<AllCLientCard navigation={navigation} item={item} key={index} />);
                })}
            </ScrollView>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
            <BottomMaskPopUp refRBSheet={refRBSheet} height={200}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Options</Text>
                    </View>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <FontAwesome5 name="edit" size={18} color="#33b9ff" />
                        <Text style={styles.optionsText}>Edit Group Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={deleteGroup} style={styles.optionsContainer}>
                        <MaterialIcons name="delete" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Delete Group</Text>
                    </TouchableOpacity>
                </View>
            </BottomMaskPopUp>
            
        </SafeAreaView>
    )
}

export default GroupsListScreen
