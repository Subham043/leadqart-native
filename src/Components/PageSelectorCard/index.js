import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PageSelectorCard = ({ name, id, description, image, navigation, leadId }) => {

    return (
        <TouchableOpacity style={styles.messageMainContainer} onPress={()=>navigation.navigate('SendPage',{
            pageId:id, 
            itemId:leadId
        })} >
            <View style={styles.leftMainContainer}>
                <View style={styles.pdfContainer}>
                    <Image source={{uri:`https://leadqart.herokuapp.com/uploads/${image}`}} style={styles.pdfImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.description} numberOfLines={1}>{description}</Text>
                </View>
            </View>
            <View style={styles.rightMainContainer}>
                <MaterialIcons name="keyboard-arrow-right" size={25} color="gray" />
            </View>
        </TouchableOpacity>
    )
}

export default PageSelectorCard