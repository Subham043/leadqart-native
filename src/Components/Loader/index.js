import React, { useRef } from 'react'
import { Animated, ActivityIndicator, Dimensions,SafeAreaView, View } from 'react-native'
import styles from './styles'
import { StatusBar as SBar } from 'react-native'

const Loader = (props) => {

    return (
        <>
        {props.status ? <Animated.View style={styles.loader}>
            <ActivityIndicator size="large" color="#33b9ff" />
        </Animated.View> : null}
        </>
    )
}

export default Loader
