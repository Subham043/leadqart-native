import React, { useState, useEffect } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import FileCard from '../../Components/FileCard';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import FileCardPlaceholder from '../../Components/FileCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import { setSeacrhText, selectSearchText } from "../../../app/feature/searchTextSlice"

const FilesScreen = ({ navigation, tabIndexNumber }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const searchText = useSelector(selectSearchText)
    const reload = useSelector(selectReload)
    const [fileData, setFileData] = React.useState([]);
    const [searchData, setSearchData] = React.useState([]);

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setLoadng(true)
        setFileData([])
        getContentFile();
        dispatch(setSeacrhText(""))
    }, []);

    useEffect(() => {
        let mounted = true
        if (tabIndexNumber === 1 || reload) {
            if (mounted) {
                setLoadng(true)
                setFileData([])
                getContentFile();
                dispatch(setReload(false));
                dispatch(setSeacrhText(""))
                return;
            }
        } else {
            if (mounted) {
                setLoadng(true)
                setFileData([])
                getContentFile();
                dispatch(setSeacrhText(""))
            }
        }
        return () => mounted = false;
    }, [tabIndexNumber, reload])

    const getContentFile = async () => {
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
            let searchArr = fileData.filter(item => {
                return (item.name !=null ? item.name : "").toLowerCase().includes((searchText).toLowerCase());
            })
            setSearchData(searchArr)
        } else {
            setSearchData([])
        }
    }, [searchText])

    const actions = [
        {
            text: "Add File",
            icon: require("../../../assets/images/file.png"),
            name: "add_file",
            position: 1,
            color: "#33b9ff",
        },
    ];

    return (
        <View style={styles.container}>

            <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {loading ? <FileCardPlaceholder /> : null}
                {searchText.length > 0 && tabIndexNumber === 1 ?
                searchData.map((item, index) => {
                    return (<FileCard name={item.name} id={item.id} key={index} navigation={navigation} />);
                }):
                fileData.map((item, index) => {
                    return (<FileCard name={item.name} id={item.id} key={index} navigation={navigation} />);
                })
            }
            </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name === "add_file" ? navigation.navigate('AddFile') : null;
                }}
                color="#ffa200"
            />

        </View>
    )
}

export default FilesScreen