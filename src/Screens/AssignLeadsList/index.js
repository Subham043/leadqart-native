import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import styles from './styles'
import Octicons from 'react-native-vector-icons/Octicons';
import AssignLeadsCard from '../../Components/AssignLeadsCard'
import AlreadyAssignedLeadCard from '../../Components/AlreadyAssignedleadCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toaster from '../../Components/Toaster'
import Loader from '../../Components/Loader'
import ErrorToaster from '../../Components/ErrorToaster'

const AssignLeadsListScreen = ({ route, navigation }) => {

    const { searchText, memberId } = route.params;

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const [leadData, setLeadData] = React.useState([]);
    const [newLeadData, setNewLeadData] = React.useState([]);
    const [searchData, setSearchData] = React.useState([]);
    const [searchInput, setSearchInput] = useState("");

    const [showLoader, setShowLoader] = useState(false)
    const [showErrorToaster, setShowErrorToaster] = useState(false)
    const [showErrorToasterMsg, setShowErrorToasterMsg] = useState("")
    const [showToaster, setShowToaster] = useState(false)
    const [showToasterMsg, setShowToasterMsg] = useState("")

    const [loading, setLoadng] = React.useState(true);

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
            const resp = await axios.get(`/teams/assign/leads/view-all`, {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setLeadData([...resp?.data?.leads])
                setLoadng(false)
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


    const checkBoxHandler = (id) => {

        let group = leadData.findIndex((obj => obj.id == id));
        leadData[group].isChecked = leadData[group].isChecked === undefined ? true : !leadData[group].isChecked
        if (leadData[group].isChecked === true) {
            setNewLeadData([...newLeadData, id]);
            let newLeadGroupObj = {}
            let newLeadGroup = newLeadData.findIndex((obj => obj.id == id));
            if (newLeadGroup == -1) {
                newLeadGroupObj['id'] = (id).toString();
                setNewLeadData([...newLeadData, newLeadGroupObj]);
            } else {
                newLeadData[newLeadGroup].id = (id).toString();
                setNewLeadData([...newLeadData]);
            }

        } else {
            let newLeadGroup = newLeadData.filter((obj => obj.id != id));
            setNewLeadData(newLeadGroup);
        }
        setLeadData([...leadData])
    }

    const assignLeadshandler = async (data) => {
        setShowLoader(true)
        if(newLeadData.length==0){
            setShowErrorToasterMsg("Please select a lead")
            setShowErrorToaster(true)
            setTimeout(() => {
                setShowErrorToaster(false)
            }, 1000);
        }else{
            try {
                const response = await axios.post(`/teams/assign/leads/${memberId}`, {leads:newLeadData}, {
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
                        // dispatch(setReload(true));
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
        }
        
        setShowLoader(false)
    }

    const searchInputHandler = (text) => {
        setSearchInput(text);
        setSearchData([])
        setLoadng(true)
        if (text.length > 0) {
            let searchArr = leadData.filter(item => {
                return (item.ad != null ? item.ad : "").toLowerCase().includes((text).toLowerCase()) || (item.adset != null ? item.adset : "").toLowerCase().includes((text)
                    .toLowerCase()) || (item.campaign != null ? item.campaign : "").toLowerCase().includes((text)
                        .toLowerCase()) || (item.email != null ? item.email : "").toLowerCase().includes(
                            (text).toLowerCase()) || (item.extraInfo != null ? item.extraInfo : "").toLowerCase().includes(
                                (text).toLowerCase()) || (item.facebookPage != null ? item.facebookPage : "").toLowerCase().includes(
                                    (text).toLowerCase()) || (item.formName != null ? item.formName : "").toLowerCase().includes(
                                        (text).toLowerCase()) || (item.job != null ? item.job : "").toLowerCase().includes(
                                            (text).toLowerCase()) || (item.leadSource != null ? item.leadSource : "").toLowerCase().includes(
                                                (text).toLowerCase()) || (item.name != null ? item.name : "").toLowerCase().includes(
                                                    (text).toLowerCase()) || (item.phone != null ? (item.phone).toString() : "").toLowerCase().includes(
                                                        (text).toLowerCase());
            })
            setSearchData(searchArr)
        } else {
            setSearchData([])
        }
        setLoadng(false)
    }

    return (
        <SafeAreaView style={{ ...styles.mainContainer }}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            {/* <View style={styles.layerContainer}>
                <View style={styles.bottomContainer}>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder={`${searchText}`} placeholderTextColor="gray" onChangeText={text => searchInputHandler(text)} defaultValue={searchInput} />

                        <View style={styles.searchBtn}>
                            <Octicons name="search" size={20} color="#33b9ff" />
                        </View>
                    </View>
                </View>
            </View> */}
            <ScrollView style={styles.ScrollContainer} >
                {loading ? <AllClientCardPlaceholder /> : null}
                {searchInput.length > 0 ?
                    searchData.map((item, index) => {
                        return (<AssignLeadsCard navigation={navigation} key={index} item={item} />);
                    })
                    :
                    leadData.map((item, index) => {
                        if(item.assigned==0){
                            return (<AssignLeadsCard navigation={navigation} key={index} item={item} checkBoxHandler={checkBoxHandler} />)
                        }else{
                            return (<AlreadyAssignedLeadCard navigation={navigation} key={index} item={item} />)
                        }
                    })
                }
            </ScrollView>
            <View style={styles.saveBottomContainer}>
                {newLeadData.length!=0 ?
                <TouchableOpacity style={styles.bottomButton} onPress={() => assignLeadshandler()}>
                    <Text style={styles.bottomButtonText}>ASSIGN LEADS</Text>
                </TouchableOpacity>
                : null }
            </View>
            <Loader status={showLoader} />
            <ErrorToaster message={showErrorToasterMsg} status={showErrorToaster} />
            <Toaster message={showToasterMsg} status={showToaster} />
        </SafeAreaView>
    )
}

export default AssignLeadsListScreen
