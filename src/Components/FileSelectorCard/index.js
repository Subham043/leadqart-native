import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FileSelectorCard = ({ name, id, navigation, leadId }) => {


    return (
        <TouchableOpacity style={styles.messageMainContainer} onPress={()=>navigation.navigate('SendFile',{
            fileId:id, 
            itemId:leadId
        })} >
            <View style={styles.leftMainContainer}>
                <View style={styles.pdfContainer}>
                    <FontAwesome5 name="file-pdf" size={40} color="gray" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{name}</Text>
                </View>
            </View>
            <View style={styles.rightMainContainer}>
                <MaterialIcons name="keyboard-arrow-right" size={25} color="gray" />
            </View>
        </TouchableOpacity>
    )
}

export default FileSelectorCard