import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Markdown from 'react-native-simple-markdown'

const MessageCard = ({id, name,description, navigation}) => {

    
    return (
            <TouchableOpacity onPress={()=>navigation.navigate('ViewMessage',{
                id,name,description
            })} style={styles.messageMainContainer}>
                <View style={styles.leftMainContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.description} numberOfLines={2}><Markdown>{description}</Markdown></Text>
                </View>
                <View style={styles.rightMainContainer}>
                    <MaterialIcons name="keyboard-arrow-right" size={25} color="gray" />
                </View>
            </TouchableOpacity>
    )
}

export default MessageCard
