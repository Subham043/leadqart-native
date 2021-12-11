import React from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchFilterBar = ({text, navigation}) => {
    return (
        <View style={styles.searchContainer}>
            <TouchableOpacity onPress={() =>navigation.navigate('LeadSearchList',{
                searchText:text
            })} style={styles.searchInputContainer}>
                <Text style={styles.searchInput}>{text}</Text>

                <View style={styles.searchBtn}>
                    <Octicons name="search" size={25} color="#33b9ff" />
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.filterContainer}>
                <View>
                    <FontAwesome name="filter" size={25} color="#33b9ff" />
                </View>
            </TouchableOpacity> */}
        </View>
    )
}

export default SearchFilterBar
