import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FollowCard = ({ name,imageUri, number, loadData, navigation }) => {

    return (
        <TouchableOpacity onPress={()=>navigation.navigate('FollowUpList', {
            followUpName: name,
            loadData
          })} style={styles.messageMainContainer}>
            <View style={styles.leftMainContainer}>
                <View style={styles.pdfContainer}>
                    <Image source={imageUri} style={styles.pdfImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{name}</Text>
                </View>
            </View>
            <View style={styles.rightMainContainer}>
                <Text style={styles.title}>{number}</Text>
                <MaterialIcons name="keyboard-arrow-right" size={25} color="gray" />
            </View>
        </TouchableOpacity>
    )
}

export default FollowCard