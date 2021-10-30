import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles'
import AllCLientCard from '../../Components/AllCLientCard'

const AllClientsScreen = () => {
    return (
        <ScrollView style={styles.ScrollContainer}>
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
            <AllCLientCard />
        </ScrollView>
    )
}

export default AllClientsScreen
