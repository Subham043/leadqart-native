import React, { useState, useEffect } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import MessageCard from '../../Components/MessageCard';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import MessageCardPlaceholder from '../../Components/MessageCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import { setSeacrhText, selectSearchText } from "../../../app/feature/searchTextSlice"

const MessageScreen = ({ navigation, tabIndexNumber }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const searchText = useSelector(selectSearchText)
    const reload = useSelector(selectReload)
    const [messageData, setMessageData] = React.useState([]);
    const [searchData, setSearchData] = React.useState([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setMessageData([])
        setLoadng(true)
        getContentMessage();
        dispatch(setSeacrhText(""))
    }, []);

    useEffect(() => {
        let mounted = true;
        if (tabIndexNumber === 0 || reload) {
            if (mounted) {
                setLoadng(true)
                setMessageData([])
                getContentMessage();
                dispatch(setReload(false));
                dispatch(setSeacrhText(""))
                return;
            }
        } else {
            if (mounted) {
                setLoadng(true)
                setMessageData([])
                getContentMessage();
                dispatch(setSeacrhText(""))
            }
        }
        return () => mounted= false;
    }, [tabIndexNumber, reload])

    const getContentMessage = async () => {
        try {
            const resp = await axios.get('/content-message/view-all', {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setMessageData([...resp?.data?.contentMessage])
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

    useEffect(() => {
        if (searchText.length > 0) {
            let searchArr = messageData.filter(item => {
                return (item.title !=null ? item.title : "").toLowerCase().includes((searchText).toLowerCase()) || (item.message !=null ? item.message : "").toLowerCase().includes((searchText)
                        .toLowerCase());
            })
            setSearchData(searchArr)
        } else {
            setSearchData([])
        }
    }, [searchText])

    const actions = [
        {
            text: "Add Message",
            icon: require("../../../assets/images/message.png"),
            name: "add_message",
            position: 1,
            color: "#33b9ff",
        },
    ];

    return (
        <View style={styles.container}>

            <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {loading ? <MessageCardPlaceholder /> : null}
                {searchText.length > 0 && tabIndexNumber === 0 ?
                searchData.map((item, index) => {
                    return (<MessageCard id={item.id} name={item.title} description={item.message} key={index} navigation={navigation} />);
                })
                :
                messageData.map((item, index) => {
                    return (<MessageCard id={item.id} name={item.title} description={item.message} key={index} navigation={navigation} />);
                })
                }
            </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name === "add_message" ? navigation.navigate('AddMessage') : null;
                }}
                color="#ffa200"
            />

        </View>
    )
}

export default MessageScreen
