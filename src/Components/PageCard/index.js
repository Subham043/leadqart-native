import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PageCard = ({ name, description }) => {


    return (
        <TouchableOpacity style={styles.messageMainContainer}>
            <View style={styles.leftMainContainer}>
                <View style={styles.pdfContainer}>
                    <Image source={{uri:"https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}} style={styles.pdfImage} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                </View>
            </View>
            <View style={styles.rightMainContainer}>
                <MaterialIcons name="keyboard-arrow-right" size={25} color="gray" />
            </View>
        </TouchableOpacity>
    )
}

export default PageCard