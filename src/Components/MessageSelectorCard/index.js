import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MessageSelectorCard = ({id, name,description, navigation, leadId}) => {

    
    return (
            <TouchableOpacity onPress={()=>navigation.navigate('SendMessage',{
                messageId:id, 
                itemId:leadId
            })} style={styles.messageMainContainer}>
                <View style={styles.leftMainContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                </View>
                <View style={styles.rightMainContainer}>
                    <MaterialIcons name="keyboard-arrow-right" size={25} color="gray" />
                </View>
            </TouchableOpacity>
    )
}

export default MessageSelectorCard
