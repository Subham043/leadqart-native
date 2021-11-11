import React, { useState, useEffect } from 'react'
import { ScrollView, View, RefreshControl } from 'react-native'
import PageCard from '../../Components/PageCard';
import styles from './styles'
import { FloatingAction } from "react-native-floating-action";
import PageCardPlaceholder from '../../Components/PageCardPlaceholder'
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../../app/feature/userSlice"
import { removeRefreshToken } from "../../../app/feature/refreshTokenSlice"
import axios from "../../../axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setReload, selectReload } from "../../../app/feature/reloadSlice"
import { setSeacrhText, selectSearchText } from "../../../app/feature/searchTextSlice"

const PagesScreen = ({ navigation, tabIndexNumber }) => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const searchText = useSelector(selectSearchText)
    const reload = useSelector(selectReload)
    const [pageData, setPageData] = React.useState([]);
    const [searchData, setSearchData] = React.useState([]);


    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setLoadng(true)
        setPageData([])
        getContentPage();
        dispatch(setSeacrhText(""))
    }, []);

    useEffect(() => {
        let mounted = true
        if (tabIndexNumber === 2 || reload) {
            if (mounted) {
                setLoadng(true)
                setPageData([])
                getContentPage();
                dispatch(setReload(false));
                return;
            }
        } else {
            if (mounted) {
                setLoadng(true)
                setPageData([])
                getContentPage();
            }
        }
        return () => mounted = false;
    }, [tabIndexNumber, reload])

    const getContentPage = async () => {
        try {
            const resp = await axios.get('/content-page/view-all', {
                headers: {
                    'authorization': 'bearer ' + user,
                },
            });
            if (resp?.data?.message) {
                setPageData([...resp?.data?.contentPage])
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
            let searchArr = pageData.filter(item => {
                return (item.title !=null ? item.title : "").toLowerCase().includes((searchText).toLowerCase()) || (item.description !=null ? item.description : "").toLowerCase().includes((searchText).toLowerCase());
            })
            setSearchData(searchArr)
        } else {
            setSearchData([])
        }
    }, [searchText])

    const actions = [
        {
            text: "Add Page",
            icon: require("../../../assets/images/page.png"),
            name: "add_page",
            position: 1,
            color: "#33b9ff",
        },
    ];

    return (
        <View style={styles.container}>

            <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {loading ? <PageCardPlaceholder /> : null}
                {searchText.length > 0 && tabIndexNumber === 2 ?
                searchData.map((item, index) => {
                    return (<PageCard name={item.title} image={item.image} description={item.description} key={index} />);
                }):
                pageData.map((item, index) => {
                    return (<PageCard name={item.title} image={item.image} description={item.description} key={index} />);
                })
            }
            </ScrollView>

            <FloatingAction
                actions={actions}
                onPressItem={name => {
                    name === "add_page" ? navigation.navigate('AddPage') : null;
                }}
                color="#ffa200"
            />

        </View>
    )
}

export default PagesScreen
