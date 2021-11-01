import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native'
import styles from './styles'
import FollowCard from '../../Components/FollowCard'

const FollowUpScreen = () => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <FollowCard name="OVERDUE" imageUri={require("../../../assets/images/overdue.png")} number="10" />
            <FollowCard name="UPCOMING" imageUri={require("../../../assets/images/upcoming.png")} number="30"  />
            <FollowCard name="SOMEDAY" imageUri={require("../../../assets/images/someday.png")} number="5"  />
            <FollowCard name="TODAY" imageUri={require("../../../assets/images/today.png")} number="9"  />
        </SafeAreaView>
    )
}

export default FollowUpScreen