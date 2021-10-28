import React, {useRef} from 'react'
import { View, Text, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles'

const index = (props) => {
    const translation2 = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    if(props.status==true){
        Animated.timing(translation2, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
    }

    return (
        <Animated.View style={{ ...styles.NotificationContainer, transform: [{ translateY: translation2 }], }}>
            <View style={styles.NotificationInner}>
                <AntDesign name="checkcircle" size={32} color="green" style={styles.NotificationIcon} />
                <View>
                    <Text style={styles.NotificationText}>{props.message}</Text>
                </View>
                <TouchableOpacity onPress={() => props.nav.navigate('Signin')}>
                    <Text style={styles.signUpBtnNotification}>Continue to<Text style={styles.signUpBtnTxt}> Sign In</Text></Text>
                </TouchableOpacity>
            </View>

        </Animated.View>
    )
}

export default index
