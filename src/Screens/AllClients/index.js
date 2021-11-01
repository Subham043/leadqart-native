import React from 'react'
import { ScrollView } from 'react-native'
import styles from './styles'
import AllCLientCard from '../../Components/AllCLientCard'

const AllClientsScreen = ({ navigation}) => {
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
