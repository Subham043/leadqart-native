import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native'
import styles from './styles'
import FollowCard from '../../Components/FollowCard'

const FollowUpScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <FollowCard name="OVERDUE" imageUri={require("../../../assets/images/overdue.png")} number="10" navigation={navigation} />
            <FollowCard name="UPCOMING" imageUri={require("../../../assets/images/upcoming.png")} number="30" navigation={navigation}  />
            <FollowCard name="SOMEDAY" imageUri={require("../../../assets/images/someday.png")} number="5" navigation={navigation}  />
            <FollowCard name="TODAY" imageUri={require("../../../assets/images/today.png")} number="9" navigation={navigation}  />
        </SafeAreaView>
    )
}

export default FollowUpScreen