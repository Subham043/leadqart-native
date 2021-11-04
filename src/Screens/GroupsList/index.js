import React, { useRef, useState, useEffect } from 'react'
import { RefreshControl, View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { StatusBar as SBar } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AllCLientCard from '../../Components/AllCLientCard'
import AllClientCardPlaceholder from '../../Components/AllClientCardPlaceholder'
import BottomMaskPopUp from '../../Components/BottomMaskPopUp';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const GroupsListScreen = ({ route, navigation }) => {

    const refRBSheet = useRef();
    const { groupName } = route.params;

    const [refreshing, setRefreshing] = React.useState(false);
    const [loading, setLoadng] = React.useState(true);
    const [array, setArray] = React.useState([]);

    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setArray([]);
        setLoadng(true)
        wait(2000).then(() => { setRefreshing(false); pageLoader() });
    }, []);

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
                <View style={styles.topContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                        <MaterialIcons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.backButtonText}>{groupName}</Text>
                    <TouchableOpacity onPress={() => refRBSheet.current.open()} >
                        <Text style={styles.backButtonText}>Options</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.searchInputContainer}>
                        <TextInput style={styles.searchInput} placeholder={`Search ${groupName}`} placeholderTextColor="gray" />

                        <View style={styles.searchBtn}>
                            <Octicons name="search" size={20} color="#33b9ff" />
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.ScrollContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
                {loading ? <AllClientCardPlaceholder /> : null}
                {array.map((item, index) => {
                    return (<AllCLientCard navigation={navigation} key={index} />);
                })}
            </ScrollView>
            <BottomMaskPopUp refRBSheet={refRBSheet} height={200}>
                <View styles={styles.optionsMainContainer}>
                    <View style={styles.optionsHeaderContainer}>
                        <Text style={styles.optionsHeaderText}>Options</Text>
                    </View>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <FontAwesome5 name="edit" size={18} color="#33b9ff" />
                        <Text style={styles.optionsText}>Edit Group Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.optionsContainer}>
                        <MaterialIcons name="delete" size={20} color="#33b9ff" />
                        <Text style={styles.optionsText}>Delete Group</Text>
                    </TouchableOpacity>
                </View>
            </BottomMaskPopUp>
        </SafeAreaView>
    )
}

export default GroupsListScreen
