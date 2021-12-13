import React, { useState, useEffect } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import GroupCard from '../../Components/GroupCard';
import NewLeadCard from '../../Components/NewLeadCard';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import { useDispatch, useSelector } from "react-redux"
import GroupCardPlaceholder from '../../Components/GroupCardPlaceholder'
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setReload, selectReload } from "../../../app/feature/reloadSlice"

const GroupsScreen = ({ navigation, tabIndexNumber }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const reload = useSelector(selectReload)
    const [groupData, setGroupData] = React.useState([]);
    const [newLeadData, setNewLeadData] = React.useState([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setGroupData([])
        setNewLeadData([])
        setLoadng(true)
        getGroups();
        getNewLeads()
    }, []);

    useEffect(() => {
        let mounted = true
        if (tabIndexNumber === 2 || reload) {
            if (mounted) {
                setLoadng(true)
                setGroupData([])
                setNewLeadData([])
                getGroups();
                getNewLeads()
                dispatch(setReload(false));
                return;
            }
        } else {
            if (mounted) {
                setLoadng(true)
                setGroupData([])
                setNewLeadData([])
                getGroups();
                getNewLeads()
            }
        }
        return () => mounted = false;
    }, [tabIndexNumber, reload])

    const getGroups = async () => {
        try {
            const resp = await axios.get('/groups/view-all', {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setGroupData([...resp?.data?.groups])
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
                }
            }


        } catch (e) { console.log(e) }
    }


    const getNewLeads = async () => {
        try {
            const resp = await axios.get('/leads/view-all/new-leads', {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            // console.log(resp.data);
            if (resp?.data?.message) {
                setNewLeadData([...resp?.data?.leads])
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
                }
            }


        } catch (e) { console.log(e) }
    }




    const actions = [
        {
            text: "Add Group",
            icon: require("../../../assets/images/floaticon1.png"),
            name: "add_group",
            position: 1,
            color: "#33b9ff",
        },
    ];

    return (
        <View style={styles.container}>

            <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {loading ? <GroupCardPlaceholder /> : null}
                {groupData.length > 0 ? <NewLeadCard name="NEW LEADS" number={newLeadData.length} color="#33b9ff" navigation={navigation} /> : null}
                {groupData.map((item, index) => {
                    return (<GroupCard name={item.name} number={item.leads.length} color={item.color} id={item.id} key={index} navigation={navigation} />);
                })}
            </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name === "add_group" ? navigation.navigate('AddGroup') : null;
                }}
                color="#ffa200"
            />
        </View>
    )
}

export default GroupsScreen
