import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AllCLientCard from '../../Components/AllCLientCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeadSearchListScreen = ({ route, navigation }) => {

    const { searchText } = route.params;
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const [leadData, setLeadData] = React.useState([]);
    const [searchData, setSearchData] = React.useState([]);
    const [searchInput, setSearchInput] = useState("");

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
            const resp = await axios.get('/leads/view-all', {
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

    const searchInputHandler = (text) => {
        setSearchInput(text);
        setSearchData([])
        setLoadng(true)
        if (text.length > 0) {
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
        setLoadng(false)
    }

    return (
        <SafeAreaView style={{ ...styles.mainContainer, paddingTop: SBar.currentHeight }}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <View style={styles.layerContainer}>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                        <MaterialIcons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder={`${searchText}`} placeholderTextColor="gray" onChangeText={text => searchInputHandler(text)} defaultValue={searchInput} />

                        <View style={styles.searchBtn}>
                            <Octicons name="search" size={20} color="#33b9ff" />
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.ScrollContainer} >
                {loading ? <AllClientCardPlaceholder /> : null}
                {searchData.map((item, index) => {
                    return (<AllCLientCard navigation={navigation} key={index} item={item} />);
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default LeadSearchListScreen
