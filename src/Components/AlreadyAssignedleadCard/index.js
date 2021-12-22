import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign';

const AlreadyAssignedLeadCard = ({ navigation, item }) => {


    const getInitials = (value) => {
        return value.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    }

    return (
            <View style={styles.cardContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarOuter}>
                            <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>{item.name}</Text>
                        </View>
                        <Text style={styles.description} numberOfLines={1}>Facebook Lead via {(item.facebookPage)!=null?item.facebookPage:item.leadSource}, Campaign: {(item.adset)!=null?item.adset:item.ad}, Ad-set</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.leftContainer}>
                        <View style={{ ...styles.bottomTextContainer, backgroundColor: '#953553', }}>
                            <AntDesign name="star" size={20} color="#fff" />
                            <Text numberOfLines={1} style={styles.bottomText}>Assigned</Text>
                        </View>
                    </View>
                </View>
            </View>
    )
}

export default AlreadyAssignedLeadCard
