import React, { useState, useEffect } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import styles from './styles'
import AllCLientCard from '../../Components/AllCLientCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "../../../app/feature/userSlice"
import { setRefreshToken, removeRefreshToken, selectRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllClientsScreen = ({ navigation, tabIndexNumber }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const rToken = useSelector(selectRefreshToken)
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);
    const [leadData, setLeadData] = React.useState([]);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setLoadng(true)
        setLeadData([])
        getLeads();

    }, []);

    useEffect(async () => {
        if (tabIndexNumber === 0) {
            setLoadng(true)
            setLeadData([])
            getLeads();
        }
        setLoadng(true)
        setLeadData([])
        getLeads();
        return () => {
            console.log('Do some cleanup');
        }
    }, [getLeads])

    const getLeads = async () => {
        getTokens();
        try {
            const resp = await axios.get('/leads/view-all', {
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
                    storeDataAsync("accessToken", response?.data.accessToken);
                    storeDataAsync("refreshToken", response?.data.refreshToken);
                    dispatch(login(response?.data.accessToken));
                    dispatch(setRefreshToken(response?.data.refreshToken));
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
        <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            {loading ? <AllClientCardPlaceholder /> : null}
            {leadData.map((item, index) => {
                return (<AllCLientCard navigation={navigation} item={item} key={index} />);
            })}
        </ScrollView>
    )
}

export default AllClientsScreen
