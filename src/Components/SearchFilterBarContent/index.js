import React from 'react'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import styles from './styles'
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux"
import { setSeacrhText, selectSearchText } from "../../../app/feature/searchTextSlice"

const SearchFilterBarContent = ({text, navigation}) => {
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText)

    const searchTextHandler = (text) => {
        dispatch(setSeacrhText(text))
    }

    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
                <TextInput style={styles.searchInput} placeholder={text} placeholderTextColor="gray"  onChangeText={text => searchTextHandler(text)} defaultValue={searchText} />

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

export default SearchFilterBarContent
