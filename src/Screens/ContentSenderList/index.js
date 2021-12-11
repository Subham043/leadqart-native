import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native'
import { StatusBar as SBar  } from 'react-native'
import styles from './styles'
import SearchFilterBarContent from '../../Components/SearchFilterBarContent'
import ContentSelectorTab from '../../Navigations/ContentSelectorTab'

const ContentSenderListScreen = ({ navigation, route }) => {
    const { leadId } = route.params;
    return (
        <SafeAreaView style={{...styles.mainContainer}}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <SearchFilterBarContent text="Search Content" />
            <ContentSelectorTab navigation={navigation} leadId={leadId} />
        </SafeAreaView>
    )
}

export default ContentSenderListScreen