import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AllCLientCard from '../../Components/AllCLientCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'

const LeadSearchListScreen = ({ route, navigation }) => {

    const { searchText } = route.params;

    const [loading, setLoadng] = React.useState(true);
    const [array, setArray] = React.useState([]);

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    useEffect(() => {
        pageLoader();
    }, [])

    const pageLoader = () => {
        wait(2000).then(() => {
            setLoadng(false)
            setArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        });
    }

    return (
        <SafeAreaView style={{ ...styles.mainContainer, paddingTop: SBar.currentHeight }}>
            <StatusBar style="light" backgroundColor="#33b9ff" />
            <View style={styles.layerContainer}>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                        <MaterialIcons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder={`${searchText}`} placeholderTextColor="gray" />

                        <View style={styles.searchBtn}>
                            <Octicons name="search" size={20} color="#33b9ff" />
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.ScrollContainer} >
                {loading ? <AllClientCardPlaceholder /> : null}
                {array.map((item, index) => {
                    return (<AllCLientCard navigation={navigation} key={index} />);
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

export default LeadSearchListScreen
