import React, { useState, useEffect } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import styles from './styles'
import AllCLientCard from '../../Components/AllCLientCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import { useIsFocused } from "@react-navigation/native";
import { FloatingAction } from "react-native-floating-action";

const AllClientsScreen = ({ navigation, tabIndexNumber }) => {

    const actions = [
        {
            text: "Add Lead",
            icon: require("../../../assets/images/teamwork.png"),
            name: "add_lead",
            position: 1,
            color: "#33b9ff",
        },
        {
            text: "Import Lead via XLSX/CSV",
            icon: require("../../../assets/images/page.png"),
            name: "add_csv",
            position: 2,
            color: "#33b9ff",
        },
        // {
        //     text: "Import Lead via google drive",
        //     icon: require("../../../assets/images/page.png"),
        //     name: "add_drive",
        //     position: 2,
        //     color: "#33b9ff",
        // },
    ];

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const reload = useSelector(selectReload)

    const isFocused = useIsFocused();

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
        if (tabIndexNumber === 0 || isFocused) {
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
    }, [tabIndexNumber, reload, isFocused])

    const getLeads = async () => {
        try {
            const resp = await axios.get('/leads/view-all', {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                // setLeadData([...resp?.data?.leads])
                // setLoadng(false)
                // setRefreshing(false)
                attachLeads(resp?.data?.leads).then((resp) => { })
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

    const attachLeads = (leads) => {
        return new Promise((resolve, reject) => {
            setLeadData([...leads])
            setLoadng(false)
            setRefreshing(false)
            resolve('done')
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {loading ? <AllClientCardPlaceholder /> : null}
                {leadData.map((item, index) => {
                    return (<AllCLientCard navigation={navigation} item={item} key={index} />);
                })}
            </ScrollView>
            <FloatingAction
                actions={actions}
                style={{ zIndex: 999999 }}
                onPressItem={name => {
                    name === "add_lead" ? navigation.navigate('AddLead') : null;
                    name === "add_csv" ? navigation.navigate('ImportLead') : null;
                    // name === "add_drive" ? navigation.navigate('AddDriveLead') : null;
                }}
                color="#ffa200"
            />
        </View>
    )
}

export default AllClientsScreen
