import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView  } from 'react-native'
import { StatusBar as SBar  } from 'react-native'
import styles from './styles'
import SearchFilterBar from '../../Components/SearchFilterBar'
import ClientTab from '../../Navigations/ClientTab'

const ClientsScreen = ({ navigation}) => {

    return (
        <SafeAreaView style={{...styles.mainContainer,paddingTop: SBar.currentHeight}}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <SearchFilterBar text="Seacrh clients & phonebook" navigation={navigation} />
            <ClientTab navigation={navigation} />
        </SafeAreaView>
    )
}

export default ClientsScreen
