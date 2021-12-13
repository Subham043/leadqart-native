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
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'
import { setReload } from "../../../app/feature/reloadSlice"

const NewLeadListScreen = ({ route, navigation }) => {

    const refRBSheet = useRef();
    const { groupName, groupId } = route.params;
    const dispatch = useDispatch();
    const user = useSelector(selectUser)

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);
    const [leadData, setLeadData] = React.useState([]);
    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")
    const [searchText, setSearchText] = useState("")
    const [searchData, setSearchData] = React.useState([]);

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
            const resp = await axios.get(`/leads/view-all/new-leads`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setLeadData([...resp?.data?.leads])
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

    const searchTexthandler = (text) => {
        setSearchText(text);
        if (searchText.length > 0) {
            let searchArr = leadData.filter(item => {
                return (item.ad !=null ? item.ad : "").toLowerCase().includes((text).toLowerCase()) || (item.adset !=null ? item.adset : "").toLowerCase().includes((text)
                        .toLowerCase()) || (item.campaign !=null ? item.campaign : "").toLowerCase().includes((text)
                            .toLowerCase()) || (item.email !=null ? item.email : "").toLowerCase().includes(
                                (text).toLowerCase()) || (item.extraInfo !=null ? item.extraInfo : "").toLowerCase().includes(
                                    (text).toLowerCase()) || (item.facebookPage !=null ? item.facebookPage : "").toLowerCase().includes(
                                        (text).toLowerCase()) || (item.formName !=null ? item.formName : "").toLowerCase().includes(
                                            (text).toLowerCase()) || (item.job !=null ? item.job : "").toLowerCase().includes(
                                                (text).toLowerCase()) || (item.leadSource !=null ? item.leadSource : "").toLowerCase().includes(
                                                    (text).toLowerCase()) || (item.name !=null ? item.name : "").toLowerCase().includes(
                                                        (text).toLowerCase()) || (item.phone !=null ? (item.phone).toString() : "").toLowerCase().includes(
                                                            (text).toLowerCase());
            })
            setSearchData(searchArr)
        } else {
            setSearchData([])
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
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder={`Search ${groupName}`} placeholderTextColor="gray" onChangeText={text => searchTexthandler(text)} />

                        <View style={styles.searchBtn}>
                            <Octicons name="search" size={20} color="#33b9ff" />
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {loading ? <AllClientCardPlaceholder /> : null}
                {searchText.length > 0 ?
                searchData.map((item, index) => {
                    return (<AllCLientCard navigation={navigation} item={item} key={index} />);
                }):
                leadData.map((item, index) => {
                    return (<AllCLientCard navigation={navigation} item={item} key={index} />);
                })}
            </ScrollView>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />

        </SafeAreaView>
    )
}

export default NewLeadListScreen
