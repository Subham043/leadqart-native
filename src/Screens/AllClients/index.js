import React, { useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import styles from './styles'
import AllCLientCard from '../../Components/AllCLientCard'

const AllClientsScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);


    return (
        <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
            <AllCLientCard navigation={navigation} />
        </ScrollView>
    )
}

export default AllClientsScreen
