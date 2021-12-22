import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles'

const AllClientCard = ({ navigation, item }) => {

    const getInitials = (value) => {
        return value.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('AssignedLeadsList', {
            memberId: item.memberId,
            searchText:"Search clients and phonebook"
        })} style={styles.cardContainer}>
            <View style={styles.topContainer}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarOuter}>
                        <Text style={styles.avatarText}>{getInitials(item.user.email)}</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{item.user.email}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AllClientCard
