import React, { useState, useEffect } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import styles from './styles'
import AllCLientCard from '../../Components/AllCLientCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'

const AllClientsScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);
    const [array, setArray] = React.useState([]);

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setArray([]);
        setLoadng(true)
        wait(2000).then(() => { setRefreshing(false); pageLoader() });
    }, []);

    useEffect(() => {
        pageLoader();
    }, [])

    const pageLoader = () => {
        wait(2000).then(() => {
            setLoadng(false)
            setArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });
    }

    return (
        <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            {loading ? <AllClientCardPlaceholder /> : null}
            {array.map((item, index) => {
                return (<AllCLientCard navigation={navigation} key={index} />);
            })}
        </ScrollView>
    )
}

export default AllClientsScreen
