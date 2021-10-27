import React, { useRef } from 'react'
import { Animated, ActivityIndicator, Dimensions } from 'react-native'
import styles from './styles'

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
