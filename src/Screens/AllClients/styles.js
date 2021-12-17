import {StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex:1,
        height:Dimensions.get('window').height
    },

    
    ScrollContainer:{
        flex:1,
        paddingHorizontal:10,
        paddingVertical:15,
        marginBottom:5,
    },
    
})


export default styles;