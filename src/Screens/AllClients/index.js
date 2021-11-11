import React, { useState, useEffect } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import styles from './styles'
import AllCLientCard from '../../Components/AllCLientCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const AllClientsScreen = ({ navigation, tabIndexNumber }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
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
        let mounted = true;
        if (tabIndexNumber === 0) {
            if (mounted) {
                setLoadng(true)
                setLeadData([])
                getLeads();
            }
        } else {
            if (mounted) {
                setLoadng(true)
                setLeadData([])
                getLeads();
            }
        }
        return () => mounted = false;
    }, [tabIndexNumber])

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
        <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            {loading ? <AllClientCardPlaceholder /> : null}
            {leadData.map((item, index) => {
                return (<AllCLientCard navigation={navigation} item={item} key={index} />);
            })}
        </ScrollView>
    )
}

export default AllClientsScreen
