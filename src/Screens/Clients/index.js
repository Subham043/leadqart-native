import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native'
import styles from './styles'
import SearchFilterBar from '../../Components/SearchFilterBar'
import ClientTab from '../../Navigations/ClientTab'

const ClientsScreen = () => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <SearchFilterBar />
            <ClientTab />
        </SafeAreaView>
    )
}

export default ClientsScreen
