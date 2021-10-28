import React, { useRef } from 'react'
import { Animated, Text, Dimensions, View } from 'react-native'
import styles from './styles'

const ErrorToaster = (props) => {
    const translation = useRef(new Animated.Value(-Dimensions.get('window').width)).current;

    if(props.status==true){
        Animated.timing(translation, {
            toValue: 0,
            useNativeDriver: true,
          }).start(()=>{
            setTimeout(() => {
                Animated.timing(translation, {
                    toValue: -Dimensions.get('window').width,
                    useNativeDriver: true,
                  }).start();
                }, 5000);
          });
    }

    return (
        <>
        <Animated.View style={{ ...styles.toasterOuter, transform: [{ translateY: translation }], }}>
            <View style={styles.toasterInner}>
                <View>
                <Text style={styles.text}>{props.message}</Text>
                </View>
            </View>
        </Animated.View>
        </>
    )
}

export default ErrorToaster
