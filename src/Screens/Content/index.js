import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View } from 'react-native'
import styles from './contentstyles'
import SearchFilterBar from '../../Components/SearchFilterBar'
import ContentTab from '../../Navigations/ContentTab'

const ContentScreen = () => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <SearchFilterBar text="Search Content" />
            <ContentTab />
        </SafeAreaView>
    )
}

export default ContentScreen
