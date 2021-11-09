import React, { useState, useEffect } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import FileCard from '../../Components/FileCard';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import FileCardPlaceholder from '../../Components/FileCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "../../../app/feature/userSlice"
import { setRefreshToken, removeRefreshToken, selectRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setReload, selectReload } from "../../../app/feature/reloadSlice"

const FilesScreen = ({ navigation, tabIndexNumber }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const reload = useSelector(selectReload)
    const rToken = useSelector(selectRefreshToken)
    const [fileData, setFileData] = React.useState([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setLoadng(true)
        setFileData([])
        getContentFile();
    }, []);

    useEffect(() => {
        if (tabIndexNumber === 1 || reload) {
            setLoadng(true)
            setFileData([])
            getContentFile();
            dispatch(setReload(false));
            return;
        }
        setLoadng(true)
        setFileData([])
        getContentFile();
    }, [tabIndexNumber, reload])

    const getContentFile = async () => {
        getTokens();
        try {
            const resp = await axios.get('/content-file/view-all', {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setFileData([...resp?.data?.contentFile])
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
          text: "Add File",
          icon: require("../../../assets/images/file.png"),
          name: "add_file",
          position: 1,
          color:"#33b9ff",
        },
      ];

    return (
        <View style={styles.container}>

        <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            {loading ? <FileCardPlaceholder /> : null}
            {fileData.map((item, index) => {
                return (<FileCard name={item.name} key={index} />);
            })}
        </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name==="add_file" ?  navigation.navigate('AddFile') : null;
                }}
                color="#ffa200"
            />

        </View>
    )
}

export default FilesScreen