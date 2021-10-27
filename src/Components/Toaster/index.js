import React, { useRef } from 'react'
import { Animated, Text, Dimensions, View } from 'react-native'
import styles from './styles'
import { AntDesign } from '@expo/vector-icons';

const Toaster = (props) => {
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
                
                <AntDesign name="checkcircleo" size={20} color="green" />
            </View>
        </Animated.View>
        </>
    )
}

export default Toaster
