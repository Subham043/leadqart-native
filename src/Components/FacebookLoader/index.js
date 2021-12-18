import React, { useRef } from 'react'
import { Animated, ActivityIndicator, } from 'react-native'
import styles from './styles'
import { StatusBar as SBar } from 'react-native'

const FacebookLoader = (props) => {

    return (
        <>
        {props.status ? <Animated.View style={styles.loader}>
            <ActivityIndicator size="large" color="#33b9ff" />
        </Animated.View> : null}
        </>
    )
}

export default FacebookLoader
