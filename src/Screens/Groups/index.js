import React, { useState, useEffect } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import GroupCard from '../../Components/GroupCard';
import GroupModal from '../../Components/GroupModal';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import { useDispatch, useSelector } from "react-redux"
import { setGroupModal, selectGroupModal } from "../../../app/feature/groupModalSlice"
import GroupCardPlaceholder from '../../Components/GroupCardPlaceholder'
import { login, logout, selectUser } from "../../../app/feature/userSlice"
import { setRefreshToken, removeRefreshToken, selectRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setReload, selectReload } from "../../../app/feature/reloadSlice"

const GroupsScreen = ({ navigation, tabIndexNumber }) => {

    const dispatch = useDispatch();
    const loaderModal = useSelector(selectGroupModal)
    const user = useSelector(selectUser)
    const reload = useSelector(selectReload)
    const rToken = useSelector(selectRefreshToken)
    const [groupData, setGroupData] = React.useState([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setGroupData([])
        setLoadng(true)
        getGroups();
    }, []);

    useEffect(() => {

        if (tabIndexNumber === 2 || reload) {
            setLoadng(true)
            setGroupData([])
            getGroups();
            dispatch(setReload(false));
            return;
        }
        setLoadng(true)
        setGroupData([])
        getGroups();
    }, [tabIndexNumber, reload])

    const getGroups = async () => {
        getTokens();
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
                    storeDataAsync("accessToken", response?.data.accessToken);
                    storeDataAsync("refreshToken", response?.data.refreshToken);
                    dispatch(login(response?.data.accessToken));
                    dispatch(setRefreshToken(response?.data.refreshToken));
                    navigation.navigate('Signin')
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
                {groupData.length > 0 ? <GroupCard name="NEW LEADS" number="222" color="#33b9ff" navigation={navigation} /> : null}
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

            <GroupModal />
        </View>
    )
}

export default GroupsScreen
