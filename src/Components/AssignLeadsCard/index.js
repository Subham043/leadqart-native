import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign';

const ClientSenderCard = ({ navigation, item, checkBoxHandler }) => {


    const getInitials = (value) => {
        return value.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    }

    const tapHandler = (id) => {
        checkBoxHandler(id)
    }

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={() =>tapHandler(item.id)}>
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
                    <Text style={styles.description} numberOfLines={1}>Facebook Lead via {(item.facebookPage) != null ? item.facebookPage : item.leadSource}, Campaign: {(item.adset) != null ? item.adset : item.ad}, Ad-set</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Text>Tap to assign</Text>
                {item.isChecked == undefined || item.isChecked == false ?
                    <Fontisto name="checkbox-passive" size={18} color="#33b9ff" />:
                    <Fontisto name="checkbox-active" size={18} color="#33b9ff" /> 
                }
            </View>
        </TouchableOpacity>
    )
}

export default ClientSenderCard
