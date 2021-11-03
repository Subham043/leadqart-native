import React from 'react'
import { TouchableOpacity } from 'react-native'
import styles from './styles'

const LeadSocialButton = (props) => {
    return (
        <TouchableOpacity style={styles.SocialButton}>
            {props.children}
        </TouchableOpacity>
    )
}

export default LeadSocialButton
