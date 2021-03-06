import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native'
import { StatusBar as SBar  } from 'react-native'
import styles from './contentstyles'
import SearchFilterBarContent from '../../Components/SearchFilterBarContent'
import ContentTab from '../../Navigations/ContentTab'

const ContentScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{...styles.mainContainer,paddingTop: SBar.currentHeight}}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <SearchFilterBarContent text="Search Content" />
            <ContentTab navigation={navigation} />
        </SafeAreaView>
    )
}

export default ContentScreen
