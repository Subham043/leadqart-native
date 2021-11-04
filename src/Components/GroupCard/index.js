import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const GroupCard = ({name,number,color,navigation}) => {

    const getInitials = (value) => {
        return value.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    }
    
    return (
            <TouchableOpacity style={styles.groupMainContainer} onPress={()=>navigation.navigate('GroupsList', {
                groupName: name,
              })}>
                <View style={styles.leftMainContainer}>
                    <View style={styles.avatarMainContainer}>
                        <View style={{...styles.avatarIcon,backgroundColor:`${color}`}}>
                            <Text style={styles.avatarText}>{getInitials(name)}</Text>
                        </View>
                    </View>
                    <Text style={styles.groupNameText} numberOfLines={1}>{name}</Text>
                </View>
                <View style={styles.rightMainContainer}>
                    <Text style={styles.groupLeadText}>{number}</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={20} color="gray" />
                </View>
            </TouchableOpacity>
    )
}

export default GroupCard
