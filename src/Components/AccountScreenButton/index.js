import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles'

const AccountScreenButton = ({leftText, rightText, link, navigation}) => {
    return (
        <TouchableOpacity style={styles.PreferenceContainer} onPress={()=>navigation.navigate(link)}>
            <View style={styles.leftContainer}>
                <View style={styles.leftTextContainer}>
                    <Text style={styles.settingText}>{leftText}</Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                {rightText ? 
                <View style={styles.rightTextContainer}>
                    <Text style={styles.rightText}>{rightText}</Text>
                </View> : null }
                <View style={styles.rightInnerIconContainer}>
                    <AntDesign name="right" size={15} color="black" />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AccountScreenButton
