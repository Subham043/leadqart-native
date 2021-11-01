import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import styles from './styles'
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchFilterBar = ({text}) => {
    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
                <TextInput style={styles.searchInput} placeholder={text} placeholderTextColor="#ccc" />

                <View style={styles.searchBtn}>
                    <Octicons name="search" size={25} color="#33b9ff" />
                </View>
            </View>
            <TouchableOpacity style={styles.filterContainer}>
                <View>
                    <FontAwesome name="filter" size={25} color="#33b9ff" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default SearchFilterBar
